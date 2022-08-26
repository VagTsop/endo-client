import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { InstrumentSeriesRequest } from "src/transport/instrument-series.request";
import { environment } from "src/environments/environment";
import { CommonService } from "./common.service";

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
}
