import { Paging } from "./helper/paging.helper";

export class GenericRequest {
  private paging: Paging = new Paging();
  private id: number;
  private name: string;
  private description: string;

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

  /**
* Getter $id
* @return {number}
*/
  public get $id(): number {
    return this.id;
  }

  /**
   * Setter $id
   * @param {number[]} value
   */
  public set $id(value: number) {
    this.id = value;
  }


  /**
* Getter $name
* @return {string}
*/
  public get $name(): string {
    return this.name;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
* Getter $description
* @return {string}
*/
  public get $description(): string {
    return this.description;
  }

  /**
   * Setter $description
   * @param {string} value
   */
  public set $description(value: string) {
    this.description = value;
  }
}
