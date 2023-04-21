import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import {autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess} from './auth.actions'
import {catchError, distinct, exhaustMap, map, mergeMap, of, tap} from 'rxjs'
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpinner} from "../../store/Shared/shared.actions";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: { email: string, password: string }) => {
        return this.authService
          .login(action.email, action.password).pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({status: false}));
              this.store.dispatch(setErrorMessage({message: ''}));
              const user: User = this.authService.formatUser(data);
              if(user){
                this.authService.setUserInLocalStorage(user);
              }
              return loginSuccess({user, redirect: true});
            }),
            //перехват ошибок
            catchError((errResp) => {
              //скрываем загрузку спинер
              this.store.dispatch(setLoadingSpinner({status: false}));
              console.log(errResp.error.error.message);
              const errorMessage = this.authService.getErrorMessage(
                errResp.error.error.message
              );
              return of(setErrorMessage({message: errorMessage}));
            })
          );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({message: ''}));
          if(action.redirect){
            this.router.navigate(['/']);
          }
        })
      );
    },
    {dispatch: false}
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            this.store.dispatch(setErrorMessage({message: ''}));
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({user, redirect: true})
          }),
          //перехват ошибок
          catchError((errResp) => {
            //скрываем загрузку спинер
            this.store.dispatch(setLoadingSpinner({status: false}));
            console.log(errResp.error.error.message);
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({message: errorMessage}));
          })
        );
      })
    )
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        console.log("*************************************")
        console.log(user)
        // if(user){
        //   return of(loginSuccess({user}))
        // }
        return of(loginSuccess({user, redirect: false}));
      })
    );
  });

  logout$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(autoLogout),
      map((action)=>{
        this.authService.logout();
        this.router.navigate(['auth']);
      })
    )
  }, {dispatch: false});
}
