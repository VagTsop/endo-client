import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { InstrumentSeriesRequest } from "src/transport/instrument-series.request";

@Injectable()
export class InstrumentSeriesService {
  constructor(protected http: HttpClient) { }

  private basePath = 'http://localhost:8080/api/instruments-series'

  getInstrumentSeriesList(request: InstrumentSeriesRequest) {
    return this.http.get(
      this.basePath + '/get-instrument-series-list',
      {
        params: this.constructParams(request, null)
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  public constructParams(
    req: InstrumentSeriesRequest,
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
