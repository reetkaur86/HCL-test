import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { Store } from '@ngrx/store';
import * as fromSelectors from '../../store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  countries: Country[];
  selectedCountry$: Observable<Country>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.selectedCountry$ = this.store.select(fromSelectors.selectSelectedCountry);
  }

}
