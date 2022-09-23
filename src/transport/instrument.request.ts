import { GenericRequest } from "./generic.request";

export class InstrumentRequest extends GenericRequest {

  private instrumentRef: string;
  private instrumentLot: string;
  private instrumentManufacturer: string;
  private instrumentNotes: string;
  private instrumentPurchaseDate: string;
  private purchaseDateFrom: string;
  private purchaseDateTo: string;
  private instrumentSeriesCodesList: string[];

  /**
   * Getter $instrumentRef
   * @return {string}
   */
  public get $instrumentRef(): string {
    return this.instrumentRef;
  }

  /**
   * Setter $instrumentRef
   * @param {string} value
   */
  public set $instrumentRef(value: string) {
    this.instrumentRef = value;
  }

  /**
   * Getter $instrumentLot
   * @return {string}
   */
  public get $instrumentLot(): string {
    return this.instrumentLot;
  }

  /**
   * Setter $instrumentLot
   * @param {string} value
   */
  public set $instrumentLot(value: string) {
    this.instrumentLot = value;
  }

  /**
    * Getter $instrumentManufacturer
    * @return {string}
    */
  public get $instrumentManufacturer(): string {
    return this.instrumentManufacturer;
  }

  /**
   * Setter $instrumentManufacturer
   * @param {string} value
   */
  public set $instrumentManufacturer(value: string) {
    this.instrumentManufacturer = value;
  }

  /**
    * Getter $instrumentNotes
    * @return {string}
    */
  public get $instrumentNotes(): string {
    return this.instrumentNotes;
  }

  /**
   * Setter $instrumentNotes
   * @param {string} value
   */
  public set $instrumentNotes(value: string) {
    this.instrumentNotes = value;
  }

  /**
   * Getter $instrumentPurchaseDate
   * @return {string}
   */
  public get $instrumentPurchaseDate(): string {
    return this.instrumentPurchaseDate;
  }

  /**
   * Setter $instrumentPurchaseDate
   * @param {string} value
   */
  public set $instrumentPurchaseDate(value: string) {
    this.instrumentPurchaseDate = value;
  }

  /**
 * Getter $purchaseDateFrom
 * @return {string}
 */
  public get $purchaseDateFrom(): string {
    return this.purchaseDateFrom;
  }

  /**
   * Setter $purchaseDateFrom
   * @param {string} value
   */
  public set $purchaseDateFrom(value: string) {
    this.purchaseDateFrom = value;
  }

  /**
   * Getter $purchaseDateTo
   * @return {string}
   */
  public get $purchaseDateTo(): string {
    return this.purchaseDateTo;
  }

  /**
   * Setter $purchaseDateTo
   * @param {string} value
   */
  public set $purchaseDateTo(value: string) {
    this.purchaseDateTo = value;
  }


  /**
   * Getter $instrumentSeriesCodesList
   * @return {string[]}
   */
  public get $instrumentSeriesCodesList(): string[] {
    return this.instrumentSeriesCodesList;
  }

  /**
   * Setter $instrumentSeriesCodesList
   * @param {string[]} value
   */
  public set $instrumentSeriesCodesList(value: string[]) {
    this.instrumentSeriesCodesList = value;
  }

}
