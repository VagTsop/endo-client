import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InstrumentRequest } from "src/transport/instrument.request";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { CommonService } from './common.service';

@Injectable()
export class InstrumentService extends CommonService {

  private baseUrl = environment.BASE_URL + '/instruments'

  createInstrument(request: InstrumentRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-instrument', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updateInstrument(request: InstrumentRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-instrument?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  deleteInstrument(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-instrument', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchInstruments(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-instruments')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchInstrumentsSeriesCodes(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-instruments-series-codes')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getInstrumentsList(request: InstrumentRequest) {
    return this.http.get(
      this.baseUrl + '/get-instruments-list',
      {
        params: this.constructParams(request, 'name,purchaseDateFrom,purchaseDateTo,instrumentSeriesCodesList')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  getInstrumentById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-instrument-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

}
