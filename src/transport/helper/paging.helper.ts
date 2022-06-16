import { Field } from './table-fields.helper';

export class Paging {

  private pageSize: number = 10;
  private pageNumber: number = 1;
  private orderField: string = Field.INSTRUMENT_MANUFACTURER;
  private orderDirection: string = 'DESC';
  private totalSize: number = 0;

  constructor() { }


  /**
   * Getter $pageSize
   * @return {number }
   */
  public get $pageSize(): number {
    return this.pageSize;
  }

  /**
   * Setter $pageSize
   * @param {number } value
   */
  public set $pageSize(value: number) {
    this.pageSize = value;
  }

  /**
   * Getter $pageNumber
   * @return {number }
   */
  public get $pageNumber(): number {
    return this.pageNumber;
  }

  /**
   * Setter $pageNumber
   * @param {number } value
   */
  public set $pageNumber(value: number) {
    this.pageNumber = value;
  }

  /**
   * Getter $orderField
   * @return {string }
   */
  public get $orderField(): string {
    return this.orderField;
  }

  /**
   * Setter $orderField
   * @param {string } value
   */
  public set $orderField(value: string) {
    this.orderField = value;
  }

  /**
   * Getter $orderDirection
   * @return {string }
   */
  public get $orderDirection(): string {
    return this.orderDirection;
  }

  /**
   * Setter $orderDirection
   * @param {string } value
   */
  public set $orderDirection(value: string) {
    this.orderDirection = value;
  }

  /**
   * Getter $totalSize
   * @return {number}
   */
  public get $totalSize(): number {
    return this.totalSize;
  }

  /**
   * Setter $totalSize
   * @param {number} value
   */
  public set $totalSize(value: number) {
    this.totalSize = value;
  }

  public get $hasPreviousPage(): boolean {
    return ((this.pageNumber - 1) * this.pageSize + 1) !== 1;
  }

  public get $hasNextPage(): boolean {
    return (this.pageNumber * this.pageSize) < this.totalSize;
  }

  public get $hasFirstPage(): boolean {
    return this.pageNumber > 1;
  }

  public get $hasLastPage(): boolean {
    return (this.pageNumber * this.pageSize) < this.totalSize;
  }

  public get $results(): string {
    const from = (this.pageNumber - 1) * this.pageSize + 1;
    const to = (from + (this.pageSize - 1) > this.totalSize ? this.totalSize : from + (this.pageSize - 1));
    return from + ' - ' + to + ' / ' + this.totalSize;
  }
}
