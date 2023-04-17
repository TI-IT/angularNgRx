import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginStart, loginSuccess} from "./auth.actions";
import {exhaustMap, map} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setLoadingSpiner} from "../../store/shared/shared.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private  store: Store<AppState>,
  ) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: { email: string, password: string }) => {
        return this.authService
          .login(action.email, action.password).pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpiner({status: false}))
              const user: User = this.authService.formatUser(data)
              return loginSuccess({user});
            })
          );
      })
    );
  });
}
