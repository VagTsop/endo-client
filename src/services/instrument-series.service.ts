import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { InstrumentSeriesRequest } from "src/transport/instrument-series.request";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class InstrumentSeriesService extends CommonService {

  private baseUrl = environment.BASE_URL + '/instruments-series'

  getInstrumentSeriesList(request: InstrumentSeriesRequest) {
    return this.http.get(
      this.baseUrl + '/get-instrument-series-list',
      {
        params: this.constructParams(request, '')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  fetchInstrumentsByInstrumentSeriesCode(qrCode: string): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-instruments-by-instrument-series-code', {
        params: new HttpParams().set('qrCode', qrCode.toString()),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchAvailableInstruments(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-available-instruments')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
