import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private  http: HttpClient) {
  }

  login(email: string, password: string){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true}
    )
  }

}
