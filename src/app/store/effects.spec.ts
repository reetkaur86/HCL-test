import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { MainEffects } from './effects';
import * as fromActions from './actions';
import { MainService } from '../services/main.service';
import { Country } from '../interfaces/country';

let actions$: Observable<any>;
let effects: MainEffects;
let service: MainService;

describe('#Effects', () => {
  const countries: Country[] = [{
    name: 'Country1',
    capital: 'Capital1',
    population: 0,
    currencies: [],
    flag: 'flag1'
  }, {
    name: 'Country2',
    capital: 'Capital2',
    population: 0,
    currencies: [],
    flag: 'flag2'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: MainService, useValue: { getCountriesInRegion: (region: string) => of(countries) } },
        MainEffects
      ],
    });
    effects = TestBed.get(MainEffects);
    service = TestBed.get(MainService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle loadRegionData$ - loadRegionDataSuccess', (done) => {
    actions$ = of(fromActions.updateSelectedRegion({ region: 'region' }));
    effects.loadRegionData$.subscribe((action: Action) => {
      expect(action).toEqual(fromActions.loadRegionDataSuccess({ countries }));
      done();
    });
  });

  it('should handle loadRegionData$  - loadRegionDataFailed', (done) => {
    spyOn(service, 'getCountriesInRegion').and.returnValue(throwError('Error'));
    actions$ = of(fromActions.updateSelectedRegion({ region: 'region' }));
    effects.loadRegionData$.subscribe((action: Action) => {
      expect(action).toEqual(fromActions.loadRegionDataFailed());
      done();
    });
  });

});
