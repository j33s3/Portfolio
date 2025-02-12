import { ENVIRONMENT_INITIALIZER, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

// For signing
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { StsAuthService } from './sts-auth.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = new URL(environment.STSUrl);

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
  async getProjects_Image(imageId: String,): Promise<any> {
    return this.makeAPICall(`projects/image/${imageId}`, true);
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
     return this.makeAPICall('contact', false, body);
  }


  /*******************************/
  /*   UNIVERSAL FETCH METHOD    */
  /*******************************/

  /**
   * Makes a signed request to the api returning the response
   * @param path (the string path after the stage {'/prod/'})
   */
    private async makeAPICall(path: string, image: boolean = false, body?: string): Promise<any> {

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
        request = await this.fetchImage(path, signedRequest)
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