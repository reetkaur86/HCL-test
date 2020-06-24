import { initialState, mainReducer } from './reducers';
import * as fromActions from './actions';

describe('#Reducers', () => {

  it('should updateSelectedRegion', () => {
    const region = 'Region1';
    const action = fromActions.updateSelectedRegion({ region });
    const result = mainReducer(initialState, action);
    expect(result).toEqual({ ...initialState, selectedRegion: region });
  });

  it('should updateSelectedCountry', () => {
    const countryName = 'India';
    const seletedCountry = {
      name: 'India',
      capital: 'Delhi',
      population: 0,
      currencies: [],
      flag: 'flag'
    };
    const state = {
      ...initialState,
      countries: [seletedCountry, ]
    };
    const action = fromActions.updateSelectedCountry({ country: countryName });
    const result = mainReducer(state, action);
    expect(result).toEqual({ ...state, selectedCountry: seletedCountry });
  });
  it('should update selectedCountry to null', () => {
    const countryName = 'Country1';
    const seletedCountry = {
      name: 'India',
      capital: 'Delhi',
      population: 0,
      currencies: [],
      flag: 'flag'
    };
    const state = {
      ...initialState,
      countries: [seletedCountry, ]
    };
    const action = fromActions.updateSelectedCountry({ country: countryName });
    const result = mainReducer(state, action);
    expect(result).toEqual({ ...state, selectedCountry: null });
  });


  it('should updated Countries', () => {
    const countries = [{
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
    const action = fromActions.loadRegionDataSuccess({ countries });
    const result = mainReducer(initialState, action);
    expect(result.countries.length).toEqual(countries.length + 1);
  });

});
