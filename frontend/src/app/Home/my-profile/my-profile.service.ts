import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

 private apiUrl = `${env.BACKEND_URL}/profile`;
  constructor(private httpService: HttpClient) { }

  getMyDetails():Observable<any>{
    return this.httpService.get<any>(`${this.apiUrl}/details`);
  }
}
