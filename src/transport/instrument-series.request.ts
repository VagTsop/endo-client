import { GenericRequest } from "./generic.request";

export class InstrumentSeriesRequest extends GenericRequest {

  private instrumentSeriesCode: string;
  private connectedInstrumentsIds: number[] = [];
  private unconnectedInstrumentsIds: number[] = [];

  /**
  * Getter $instrumentSeriesCode
  * @return {string}
  */
  public get $instrumentSeriesCode(): string {
    return this.instrumentSeriesCode;
  }

  /**
   * Setter $instrumentSeriesCode
   * @param {string} value
   */
  public set $instrumentSeriesCode(value: string) {
    this.instrumentSeriesCode = value;
  }
  /**
   *
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

  /**
* Getter $unconnectedInstrumentsIds
* @return {number[]}
*/
  public get $unconnectedInstrumentsIds(): number[] {
    return this.unconnectedInstrumentsIds;
  }

  /**
   * Setter $unconnectedInstrumentsIds
   * @param {number[]} value
   */
  public set $unconnectedInstrumentsIds(value: number[]) {
    this.unconnectedInstrumentsIds = value;
  }
}
