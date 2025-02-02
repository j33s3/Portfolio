import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

// For signing
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { sign } from 'node:crypto';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = new URL(environment.baseUrl);

  constructor() { }

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
  async getProjects_Image(imageId: String): Promise<any> {
    return this.makeAPICall(`projects/image/${imageId}`);
  }

  /*       Getting Details       */
  async getProjects_Details(projectId: String): Promise<any> {
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
    return this.makeAPICall(`about/${aboutId}`);
  }


  /*******************************/
  /*   UNIVERSAL FETCH METHOD    */
  /*******************************/


  /**
   * Makes a signed request to the api returning the response
   * @param path (the string path after the stage {'/prod/'})
   */
    private async makeAPICall(path: string): Promise<any> {
      var request;
      const { accessKeyId, secretAccessKey, sessionToken } = await this.fetchSTS();
      const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
      const host = this.url.host;

      const options = {
        hostname: host,
        path: `/prod/${path}`,
        method: 'GET',
        headers: {
          'Host': host,
          'X-Amz-Date': date,
          'Access-Control-Allow-Origin': '*'
        },
      };


      
      const signer = new SignatureV4({
        credentials: {
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
          sessionToken: sessionToken
        },
        region: 'us-west-2',
        service: 'execute-api',
        sha256: Sha256,
      });
      


      const signedRequest = await signer.sign({
        method: options.method,
        headers: options.headers,
        hostname: host,
        path: `/prod/${path}`,
        protocol: 'https:'
      });


      await this.fetchData(path, signedRequest)
        .then(response => {
          response.blob();
        })

      /* THIS WORKS */
      // await this.fetchData(path, signedRequest)
      //   .then(response => {
      //     response.json() })
      //   .then(data => {
      //     request = data;
      //   })

      // this.fetchData(path, signedRequest)
      // .then(data => {
      //   console.log(data);
      // })
      // .catch(error => {
      //   console.error(error);
      // })
      // const data = await this.fetchData(path, signedRequest);





      // if(!response.ok) {
      //   throw new Error(`Request failed with status ${response.status}`);
      // }

      // const data = await response.json();
      return request;
    }

    // async makeAPICall(path: string): Promise<Observable<any>> {

    //   const host = this.url.host;
    //   const { accessKeyId, secretAccessKey, sessionToken } = await this.fetchSTS();
    //   const signer = new SignatureV4({
    //     credentials: {
    //       accessKeyId: accessKeyId,
    //       secretAccessKey: secretAccessKey,
    //       sessionToken: sessionToken,
    //     },
    //     region: 'us-west-2',
    //     service: 'execute-api',
    //     sha256: Sha256,
    //   });

    //   const signedRequest = await signer.sign({
    //     method: 'GET',
    //     headers: {
    //       'Host': host,
    //       'X-Amz-Date': new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''),
    //     },
    //     hostname: host,
    //     path: `/prod${path}`,
    //     protocol: 'https:'
    //   });
      
    //   const headers = new HttpHeaders(signedRequest.headers);

    //   return this.http.get(`https://${host}/prod/${path}`, { headers });
    // }

    private async fetchData(path: string, signedRequest: any): Promise<any> {

      const response = await fetch(`prod/${path}`, {
        method: 'GET',
        headers: signedRequest.headers,
      })

      return response;
      // fetch(`prod/${path}`, {
      //   method: 'GET',  
      //   headers: signedRequest.headers,
      // })
      // .then(response => response.json())
      // .then(data => {
      //   return data;
      // })
      // .catch(error => {
      //   throw new Error('There was an error fetching command: ', error);
      // })

      // const response = await fetch(`https://${host}/prod/${path}`, {
      //   method: 'GET',
      //   headers: signedRequest.headers
      // })
      // const data = await response.json();
      // return data;
    }

    /**
     * Fetches the STS tokens from lambda function
     * @returns {accessKeyId, secretAccessKey, sessionToken}
     */
    private async fetchSTS() {
      const response = await fetch(environment.STSUrl, {
        method: 'GET',
      });
      const creds = await response.json();
      return creds;
    }
}