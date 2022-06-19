import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { InstrumentRequest } from "src/transport/instrument.request";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()
export class InstrumentService {
  constructor(protected http: HttpClient) { }

  private baseUrl = environment.BASE_URL + '/instruments'

  fetchInstrumentsByInstrumentSeriesCode(qrCode: string): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-instruments-by-instrument-series-code', {
        params: new HttpParams().set('qrCode', qrCode.toString()),
      })//
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  createInstrument(request: InstrumentRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-instrument', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }//

  updateInstrument(request: InstrumentRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-instrument?id=' + request.$instrumentId,
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
        params: this.constructParams(request, 'instrumentName,purchaseDateFrom,purchaseDateTo,instrumentSeriesCodesList')
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

  public constructParams(
    req: InstrumentRequest,
    searchKeys: any
  ): HttpParams {

    let params: HttpParams = new HttpParams();
    // paging params
    params = params.append('page', (req.$paging.$pageNumber - 1).toString());
    params = params.append('size', req.$paging.$pageSize.toString());
    params = params.append(
      'sort',
      req.$paging.$orderField + ',' + req.$paging.$orderDirection
    );

    // search params
    if (searchKeys) {
      searchKeys.split(',').forEach((key) => {
        if (req[key] != null) {
          params = params.append(key, req[key]);
        }
      });
    }
    return params;
  }
}
