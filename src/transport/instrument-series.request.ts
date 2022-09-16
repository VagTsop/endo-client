import { GenericRequest } from "./generic.request";

export class InstrumentSeriesRequest extends GenericRequest {

  private instrumentSeriesCode: number;
  private instrumentIdsList: Array<string>;
  private connectedInstrumentsIds: number[] = [];

  /**
  * Getter $instrumentSeriesCode
  * @return {number}
  */
  public get $instrumentSeriesCode(): number {
    return this.instrumentSeriesCode;
  }

  /**
   * Setter $instrumentSeriesCode
   * @param {number} value
   */
  public set $instrumentSeriesCode(value: number) {
    this.instrumentSeriesCode = value;
  }
  /**
 * Getter $instrumentIdsList
 * @return {Array<string>}
 */
  public get $instrumentIdsList(): Array<string> {
    return this.instrumentIdsList;
  }

  /**
   * Setter $instrumentIdsList
   * @param {Array<string>} value
   */
  public set $instrumentIdsList(value: Array<string>) {
    this.instrumentIdsList = value;
  }

  /**
 * Getter $connectedInstrumentsIds
 * @return {number[]}
 */
  public get $connectedInstrumentsIds(): number[] {
    return this.connectedInstrumentsIds;
  }

  /**
   * Setter $connectedInstrumentsIds
   * @param {number[]} value
   */
  public set $connectedInstrumentsIds(value: number[]) {
    this.connectedInstrumentsIds = value;
  }
}
