import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { GlobalStateInterface, GlobalStateService } from '../global-state.service';
import { env } from '../../enviroments/environment';


interface SignupData {
  name: string;
  email: string;
  password: string;
}
interface LoginData{
  email: string;
  password: string;
}
interface ResponseData{
  token: string;
}
interface JwtPayload {
  exp: number; 
  name: string;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${env.BACKEND_URL}`

  constructor(private httpService: HttpClient, private globalStateService: GlobalStateService) { }

  signup(data: SignupData): Observable<ResponseData>{
    return this.httpService.post<ResponseData>(`${this.apiUrl}/auth/signup`,data)
  }

  login(data: LoginData): Observable<ResponseData>{
    return this.httpService.post<ResponseData>(`${this.apiUrl}/auth/login`, data);
  }
  // login(data:LoginData): Observable<unknown>{
  //   return this.httpService.get()
  // }

  saveToken(token: string): void{
    try{
      console.log(token)
      localStorage.setItem('authToken',token);
      console.log('Saved authToken')
    }catch(error){
      console.warn(error)
    }
    
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  logout() {
    localStorage.removeItem('authToken');
  }

  // isLoggedIn(): boolean {
  //   const token = this.getToken();
  //   if (!token) return false;

  //   try {
  //     const decoded: JwtPayload = jwtDecode(token);
  //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //     return decoded.exp > currentTime; // Check if token is still valid
  //   } catch (error) {
  //     console.error('Failed to decode token:', error);
  //     return false;
  //   }
  // }
   isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      this.clearStorage(); // Clean up if token is missing
      return false;
    }

    // Check token expiration
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp <= currentTime) {
        this.clearStorage(); // Clean up if token is expired
        return false;
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      this.clearStorage();
      return false;
    }

    // Check appState
    try {
      const savedState = localStorage.getItem('appState');
      if (!savedState) {
        this.clearStorage(); // Clean up if appState is missing
        return false;
      }

      const parsedState: GlobalStateInterface = JSON.parse(savedState);
      if (!parsedState.user || !parsedState.user.email) {
        this.clearStorage(); // Clean up if user is invalid
        return false;
      }
      // this.globalStateService.updateState(parsedState.user)
      const decoded: JwtPayload = jwtDecode(token);
      this.globalStateService.updateState({name: decoded.name})
      return true; // Token is valid and appState has a valid user
    } catch (error) {
      console.error('Failed to parse appState:', error);
      this.clearStorage();
      return false;
    }
  }
  private clearStorage() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('appState');
  }
}
