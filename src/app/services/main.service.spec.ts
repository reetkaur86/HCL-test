import { TestBed } from '@angular/core/testing';
import { MainService } from './main.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('MainService', () => {

  let service: MainService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(MainService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of countries in a region', (done) => {
    const region = 'Asia';
    const expectedResult = [
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
    service.getCountriesInRegion(region).subscribe((res: any) => {
      expect(res).toEqual(expectedResult);
      done();
    });
    const req = httpMock.expectOne(service.baseUrl + region.toLowerCase());
    req.flush(expectedResult);
  });

  it('should return error ', (done) => {
    const region = 'Asia';
    spyOn(service, 'getCountriesInRegion').and.returnValue(throwError('error'));
    service.getCountriesInRegion(region).subscribe(() => { }, (err) => {
      expect(err).toEqual('error');
      done();
    });
  });

});
