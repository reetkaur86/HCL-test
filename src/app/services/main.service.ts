import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl = 'https://restcountries.eu/rest/v2/region/';

  constructor(private http: HttpClient) {
  }

  getCountriesInRegion(region: string): Observable<Country[]> {
    return this.http.get(this.baseUrl + region.toLowerCase()).pipe(
      map((res: any[]) => {
        return res.map((val: any) => {
          const country: Country = {
            name: val.name,
            capital: val.capital,
            population: val.population,
            currencies: val.currencies,
            flag: val.flag
          };
          return country;
        });
      }),
      catchError((err: Error) => {
        return throwError(err);
      })
    );
  }

}
