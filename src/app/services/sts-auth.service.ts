import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class StsAuthService {
  private tokenData: any = null;


  constructor() { }


  async fetchToken(){
    try {
      const response = await fetch(environment.STSUrl, {
        method: 'GET'
      });
      
      const data = await response.json();
      this.tokenData = data;

      const expiresIn = new Date(data.Expiration).getTime() - new Date().getTime();
      setTimeout(() => this.fetchToken(), expiresIn - 5 * 60 * 1000);
    } catch (error) {
      console.error('Error fetching STS token', error);
    }
  }

  getToken(): any {
    return this.tokenData;
  }

  isTokenValid(): boolean {
    return this.tokenData && new Date(this.tokenData.Expiration) > new Date();
  }
}
