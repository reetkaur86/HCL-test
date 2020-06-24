import { createAction, props } from '@ngrx/store';
import { Country } from '../interfaces/country';

export const updateSelectedRegion = createAction('[Select] Update Selected Region', props<{ region: string }>());

export const updateSelectedCountry = createAction('[Select] Update Selected Country', props<{ country: string }>());

export const loadRegionData = createAction('Load Region Data');

export const loadRegionDataSuccess = createAction('Load Region Data Success', props<{ countries: Country[] }>());

export const loadRegionDataFailed = createAction('Load Region Data Failed');
