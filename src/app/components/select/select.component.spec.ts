import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';
import { Country } from 'src/app/interfaces/country';

const initialState = {
  regions: ['', 'Asia', 'Europe'],
  selectedRegion: 'Asia',
  countries: [],
  selectedCountry: 'India'
};

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let store: MockStore;
  let dispatchSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [FormsModule],
      providers: [provideMockStore({ initialState }), ]
    })
      .compileComponents();
    store = TestBed.get(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.selectedCountryOption = 'India';
    component.selectedRegionOption = 'Asia';
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateSelectedRegion', () => {
    component.mode = 'region';
    component.onSelected('Asia');
    expect(dispatchSpy).toHaveBeenCalledWith(fromActions.updateSelectedRegion({ region: 'Asia' }));
  });

  it('should dispatch updateSelectedCountry', () => {
    component.mode = 'country';
    component.onSelected('India');
    expect(dispatchSpy).toHaveBeenCalledWith(fromActions.updateSelectedCountry({ country: 'India' }));
  });

  it('should show Select Region as title ', () => {
    component.mode = 'region';
    component.ngOnInit();
    expect(component.title).toEqual('Select Region');
  });

  it('should show Select Country as title ', () => {
    component.mode = 'country';
    component.ngOnInit();
    expect(component.title).toEqual('Select Country');
  });

  it('should select Regions ', (done) => {
    const regions: string[] = ['Region1', 'Region2'];
    store.overrideSelector(fromSelectors.selectRegions, regions);
    component.ngOnInit();
    component.regionOptions$.subscribe((value: string[]) => {
      expect(value).toEqual(regions);
      done();
    });
  });

  it('should select Countries', (done) => {
    const countries: Country[] = [
      {
        name: 'Country1',
        capital: 'Capital1',
        population: 100,
        currencies: [],
        flag: 'flag1'
      }, {
        name: 'Country2',
        capital: 'Capital2',
        population: 200,
        currencies: [],
        flag: 'flag2'
      }];
    store.overrideSelector(fromSelectors.selectCountries, countries);
    component.ngOnInit();
    component.countryOptions$.subscribe((value: Country[]) => {
      expect(value).toEqual(countries);
      done();
    });
  });

});
