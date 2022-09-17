import { GenericRequest } from "./generic.request";

export class InstrumentSeriesRequest extends GenericRequest {

  private instrumentSeriesCode: number;
  private connectedInstrumentsIds: number[] = [];
  private unconnectedInstrumentsIds: number[] = [];

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
