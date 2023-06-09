import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {AuthResponseData} from "../models/AuthResponseData.model";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Store} from '@ngrx/store'
import {AppState} from '../store/app.state'
import {autoLogout} from '../auth/state/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    ) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true}
    )
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      {email, password, returnSecureToken: true}
    )
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user:User = new User(data.email, data.idToken, data.localId, expirationDate);

    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email не действительный';
      case 'INVALID_PASSWORD':
        return 'Пароль не действительный';
      case 'EMAIL_EXISTS':
        return 'Email уже существует';
      default:
        return 'Неизвестная ошибка попробуйте еще раз'
    }
  }

  setUserInLocalStorage(user: User): void  {
    //Сохраняем User в локальное хранилище браузера
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  };

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;
    // console.log('auth.service : timeInterval', timeInterval)

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

}
