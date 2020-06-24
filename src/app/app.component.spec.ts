import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { SelectComponent } from './components/select/select.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

const initialState = {
  regions: ['', 'Asia', 'Europe'],
  selectedRegion: 'something',
  countries: [],
  selectedCountry: 'India'
};

describe('AppComponent', () => {

  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        DetailsComponent,
        SelectComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
    store = TestBed.get(MockStore);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
