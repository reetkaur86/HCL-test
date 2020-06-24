import * as fromSelectors from './selectors';
import * as fromReducers from './reducers';


describe('#Selectors', () => {

  const initialState = fromReducers.initialState;

  it('should select regions', () => {
    expect(fromSelectors.selectRegions.projector(initialState)).toEqual(initialState.regions);
  });

  it('should select countries', () => {
    expect(fromSelectors.selectCountries.projector(initialState)).toEqual(initialState.countries);
  });

  it('should select selectedCountry', () => {
    expect(fromSelectors.selectSelectedCountry.projector(initialState)).toEqual(initialState.selectedCountry);
  });

  it('should select selectedRegion', () => {
    expect(fromSelectors.selectSelectedRegion.projector(initialState)).toEqual(initialState.selectedRegion);
  });

});
