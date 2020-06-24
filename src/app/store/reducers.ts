import { createReducer, on } from '@ngrx/store';
import { Country } from '../interfaces/country';
import * as fromActions from './actions';

export interface State {
  regions: string[];
  selectedRegion: string;
  countries: Country[];
  selectedCountry: Country;
}

export const initialState: State = {
  regions: ['', 'Asia', 'Europe'],
  selectedRegion: 'something',
  countries: [],
  selectedCountry: null
};

export const mainReducer = createReducer(
  initialState,
  on(fromActions.updateSelectedRegion, (state: State, props: any) => ({ ...state, selectedRegion: props.region, selectedCountry: null })),
  on(fromActions.loadRegionDataSuccess, (state: State, props: any) => (
    { ...state, countries: [{ name: '', capital: '', population: 0, currencies: [], flag: '' }, ...props.countries] })
  ),
  on(fromActions.updateSelectedCountry, (state: State, props: any) => {
    const countrySelected: Country = state.countries.filter((country: Country) => country.name === props.country)[0] || null;
    return {
      ...state,
      selectedCountry: countrySelected
    };
  })
);

