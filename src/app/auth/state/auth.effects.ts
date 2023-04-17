import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginStart, loginSuccess} from "./auth.actions";
import {catchError, distinct, exhaustMap, map, of, tap} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpiner} from "../../store/Shared/shared.actions";
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
              this.store.dispatch(setLoadingSpiner({status: false}));
              this.store.dispatch(setErrorMessage({message: ''}));
              const user: User = this.authService.formatUser(data);
              return loginSuccess({user});
            }),
            //перехват ошибок
            catchError((errResp) => {
              //скрываем загрузку спинер
              this.store.dispatch(setLoadingSpiner({status: false}));
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

  loginRedirect$ = createEffect(
    () => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => {
        this.router.navigate(['/']);
      })
    );
  },
    {dispatch: false}
  );
}
