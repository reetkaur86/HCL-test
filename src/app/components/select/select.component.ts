import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';
import { Observable } from 'rxjs';
import { Country } from 'src/app/interfaces/country';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input()
  mode: string;
  title: string;
  @Input()
  options: string[];
  selectedCountryOption: string;
  selectedRegionOption: string;
  regionOptions$: Observable<string[]>;
  countryOptions$: Observable<Country[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.options = ['', 'Asia', 'Europe'];
    this.title = this.mode === 'region' ? 'Select Region' : 'Select Country';
    this.regionOptions$ = this.store.select(fromSelectors.selectRegions);
    this.countryOptions$ = this.store.select(fromSelectors.selectCountries);
  }

  onSelected(value: string) {
    if (this.mode === 'region') {
      this.store.dispatch(fromActions.updateSelectedRegion({ region: value }));
    } else if (this.mode === 'country') {
      this.store.dispatch(fromActions.updateSelectedCountry({ country: value }));
    }
  }
}
