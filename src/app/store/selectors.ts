import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../store/reducers';

const mainState = createFeatureSelector<State>('main');

export const selectRegions = createSelector(mainState, (state: State) => state.regions);

export const selectSelectedRegion = createSelector(mainState, (state: State) => state.selectedRegion);

export const selectCountries = createSelector(mainState, (state: State) => state.countries);

export const selectSelectedCountry = createSelector(mainState, (state: State) => state.selectedCountry);
