import { ENVIRONMENT_INITIALIZER, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

// For signing
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { StsAuthService } from './sts-auth.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, catchError, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = new URL(environment.STSUrl);
  private imageCache = new Map<string, SafeUrl | null>();
  private imageFetchStatus = new Map<string, BehaviorSubject<boolean>>();

  constructor(private sanitizer: DomSanitizer, private stsAuthService: StsAuthService) { }

  async getProjects_School(): Promise<any> {
    return this.makeAPICall('projects/school');
  }

  async getProjects_Professional(): Promise<any> {
    return this.makeAPICall('projects/professional');
  }

  async getProjects_Personal(): Promise<any> {
    return this.makeAPICall('projects/personal');
  }

  /*       Getting Images       */
  async getProjects_Image(imageId: string,): Promise<any> {
    return this.makeAPICall(`projects/image/${imageId}`, true);
  }

  fetchAllProject_Images(documentId: string): Observable<boolean>{

    // Checks to see if the contents have been cached already
    if(!this.imageFetchStatus.has(documentId)) {
      this.imageFetchStatus.set(documentId, new BehaviorSubject<boolean>(false))
    }

    const statusSubject = this.imageFetchStatus.get(documentId)!;


    return from(
      this.makeAPICall(`projects/get-all-images/${documentId}`, true, true)
    ).pipe(
      tap(() => {
        statusSubject.next(true)

      }),
      catchError(() => {
        statusSubject.next(false);
        return of(false);
      }),
      
      switchMap(() => statusSubject.asObservable())
    );

  }

  /*       Getting Details       */
  async getProjects_Details(projectId: string): Promise<any> {
    return this.makeAPICall(`projects/details/${projectId}`);
  }

  /*       Getting Showcases       */
  async getProjects_Showcase(): Promise<any> {
    return this.makeAPICall('projects/showcase');
  }


  /*******************************/
  /*          FOR ABOUT          */
  /*******************************/

  async getAbout(): Promise<any> {
    return this.makeAPICall('about');
  }

  async getAbout_Image(aboutId: String): Promise<any> {
    return this.makeAPICall(`about/${aboutId}`, true);
  }


  /*******************************/
  /*       FOR DB VERSIONING     */
  /*******************************/

  async getDBVersion(): Promise<any> {
    var dbversion = null

    this.makeAPICall('dbversion')
    .then(data => {
      dbversion = data;
    })
    .catch(error => {
      console.error('An error occurred fetching DB version', error);
    })
    return dbversion;
  }

  /*******************************/
  /*       FOR SENDING EMAIL     */
  /*******************************/
  async postEmail(body: any): Promise<any> {
     return this.makeAPICall('contact', false, false, body);
  }


  /*******************************/
  /*   UNIVERSAL FETCH METHOD    */
  /*******************************/

  /**
   * Makes a signed request to the api returning the response
   * @param path (the string path after the stage {'/prod/'})
   */
    private async makeAPICall(path: string, image: boolean = false, multipleImg: boolean = false, body?: string): Promise<any> {

      var accessKeyId = '';
      var secretAccessKey = '';
      var sessionToken = '';

      // body = JSON.stringify(body);


      if(this.stsAuthService.isTokenValid()){
        ({ accessKeyId, secretAccessKey, sessionToken } = await this.stsAuthService.getToken());
      } else {
        await this.stsAuthService.fetchToken();
        ({ accessKeyId, secretAccessKey, sessionToken } = await this.stsAuthService.getToken());
      }

      var request;
      const service = 'execute-api';
      const region = 'us-west-2';
      const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      const host = this.url.host;
      const method = body ? 'POST' : 'GET'




      const options: {
        hostname: string;
        path: string;
        method: string;
        headers: Record<string, string>;
      } = {
        hostname: host,
        path: `/prod/${path}`,
        method: method,
        headers: {
          'Host': host,
          'X-Amz-Date': date,
        }
      };



      if(body) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = body.length.toString();
      }


      
      const signer = new SignatureV4({
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
          sessionToken: sessionToken
        },
        region: region,
        service: service,
        sha256: Sha256,
      });



        var signedRequest = await signer.sign({
          method: options.method,
          headers: options.headers,
          hostname: host,
          path: `/prod/${path}`,
          protocol: 'https:',
          body: body,
        });

      
      

    

      Object.assign(options.headers, signedRequest.headers);

      if(!image) {
        await this.fetchData(path, signedRequest, body)
        .then(response => response.json())
        .then(data => {
          request = data;
        })
      } else {
        if(!multipleImg) {
          request = await this.fetchImage(path, signedRequest);
        } else {
          await this.fetchAllImages(path, signedRequest);
        }
      }

      return request;
    }

    private async fetchData(path: string, signedRequest: any, body: any): Promise<any> {
      const response = await fetch(`${environment.baseUrl}${path}`, {
        method: signedRequest.method,
        headers: signedRequest.headers,
        body: body,
      })

      return response;

    }


    private async fetchAllImages(path: string, signedRequest: any) {   
      try{
        const response = await fetch(`${environment.baseUrl}${path}`, {
          method: signedRequest.method,
          headers: signedRequest.headers,
        }) 
        
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);


        var images = await response.json();
        await this.cacheImages(path.split('/').pop() as string, images)
        

      } catch(error) {
        console.error('Error fetching image: ', error);
      }
    }

    private async cacheImages(parentId: string, images: any): Promise<void> {
      if (images.projectPicture) {
        this.imageCache.set(`${parentId}`, this.createSafeUrl(images.projectPicture, images.contentType));
      }

      for (let status of images.projectStatuses) {
        this.imageCache.set(`${parentId}_${status._id}`, this.createSafeUrl(status.statusPicture, status.contentType));
      }

      return Promise.resolve();
    }

    private createSafeUrl(base64String: string, contentType: string): SafeUrl {
      const blob = this.base64ToBlob(base64String, contentType);
      const objectUrl = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    }

    private base64ToBlob(base64: string, contentType: string): Blob {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    }

    public getImage(imageId: string): SafeUrl | null | undefined{



      if(!this.imageCache.has(imageId)) {
        var parentId = imageId;
        if(imageId.length !== 24) {
          parentId = imageId.slice(0, 24);
        }

        this.fetchAllProject_Images(parentId).subscribe((error) => {
          return this.imageCache.get(imageId);
        })

        // this.makeAPICall(`projects/get-all-images/${parentId}`, true, true);
      } else {
        return this.imageCache.get(imageId);
      }
      return null;
    }

    public getImageMap(documentId: string): Observable<Map<string, SafeUrl>> {
      return this.fetchAllProject_Images(documentId).pipe(
        first(), // Only take the first emitted value
        map(() => {
          // Filter out any null values before returning
          const filteredCache = new Map<string, SafeUrl>();
          this.imageCache.forEach((value, key) => {
            if (value !== null) { // Ensure only valid SafeUrls are added
              filteredCache.set(key, value);
            }
          });
          return filteredCache;
        })
      );
    }
    

    private async fetchImage(path: string, signedRequest: any): Promise<SafeUrl | null> {
      try{
        const response = await fetch(`${environment.baseUrl}${path}`, {
          method: signedRequest.method,
          headers: signedRequest.headers,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
      
        const contentType = response.headers.get('Content-Type') || 'image/png';
        const blob = new Blob([arrayBuffer], { type: contentType});

        const objectUrl = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      } catch(error) {
        console.error('Error fetching image: ', error);
        return null;
      }
    }

}