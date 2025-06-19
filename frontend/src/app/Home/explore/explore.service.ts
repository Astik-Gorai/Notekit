import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  apiUrl = `http://localhost:3000/profile`
  constructor(private httpService: HttpClient) { }

  getUserByNameOrEmail(userData: string): Observable<any>{
    const params = new HttpParams().set('userData', userData)
    return this.httpService.get<unknown>(`${this.apiUrl}/get-users`,{params})
  }  

  sentFriendRequest(friendId:string): Observable<any>{
    console.log(friendId);
    return this.httpService.post<any>(`${this.apiUrl}/send-request`, {friendId})
  }
  getAllFriendRequests():Observable<any>{
    return this.httpService.get<any>(`${this.apiUrl}/pending-requests`)
  }

  acceptRequest(friendId: string): Observable<any>{
    return this.httpService.post<any>(`${this.apiUrl}/accept-request`, {friendId})
  }
  rejectRequest(friendId: string): Observable<any>{
    return this.httpService.post<any>(`${this.apiUrl}/reject-request`, {friendId})
  }
  getMyFriends():Observable<any>{
    return this.httpService.get<any>(`${this.apiUrl}/my-friends`)
  }
}
