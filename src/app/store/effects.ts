import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { MainService } from '../services/main.service';
import * as fromActions from './actions';
import * as fromSelectors from './selectors';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Country } from '../interfaces/country';
import { from, of } from 'rxjs';

@Injectable()
export class MainEffects {

  @Effect()
  loadRegionData$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.updateSelectedRegion),
    switchMap((action) => {
      return this.main.getCountriesInRegion(action.region).pipe(
        map((res: Country[]) => {
          return fromActions.loadRegionDataSuccess({ countries: res });
        }),
        catchError(() => of(fromActions.loadRegionDataFailed()))
      );
    })
  ));

  constructor(private actions$: Actions, private main: MainService) {
  }

}
