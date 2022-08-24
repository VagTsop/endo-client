import { Paging } from "./helper/paging.helper";

export class GenericRequest {
  private paging: Paging = new Paging();

  /**
 * Getter $paging
 * @return {Paging }
 */
  public get $paging(): Paging {
    return this.paging;
  }

  /**
   * Setter $paging
   * @param {Paging } value
   */
  public set $paging(value: Paging) {
    this.paging = value;
  }
}
