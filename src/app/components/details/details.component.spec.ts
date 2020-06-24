import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DetailsComponent } from './details.component';
import { of } from 'rxjs';
import * as fromSelectors from '../../store/selectors';
import { Country } from 'src/app/interfaces/country';

const initialState = {
  regions: ['', 'Asia', 'Europe'],
  selectedRegion: 'something',
  countries: [],
  selectedCountry: 'India'
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: provideMockStore({ initialState })
    })
      .compileComponents();
    store = TestBed.get(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.selectedCountry$ = of(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the selectedCountry', (done) => {
    const selectedCountry: Country = { name: 'Country1', capital: 'Capital1', population: 100, currencies: [], flag: 'flag1' };
    store.overrideSelector(fromSelectors.selectSelectedCountry, selectedCountry);
    component.ngOnInit();
    component.selectedCountry$.subscribe((value: Country) => {
      expect(value).toEqual(selectedCountry);
      done();
    });
  });

});
