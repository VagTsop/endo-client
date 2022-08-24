import { Paging } from "./helper/paging.helper";

export class UserRequest {
  private paging: Paging = new Paging();
  private userId: number;
  private userPhoto: any;
  private username: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private status: boolean;

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
  * Getter $userId
  * @return {number}
  */
  public get $userId(): number {
    return this.userId;
  }

  /**
  * Setter $userId
  * @param {number[]} value
  */
  public set $userId(value: number) {
    this.userId = value;
  }

  /**
  * Getter $username
  * @return {string}
  */
  public get $username(): string {
    return this.username;
  }

  /**
  * Setter $username
  * @param {string} value
  */
  public set $username(value: string) {
    this.username = value;
  }

  /**
  * Getter $firstName
  * @return {string}
  */
  public get $firstName(): string {
    return this.firstName;
  }

  /**
  * Setter $firstName
  * @param {string} value
  */
  public set $firstName(value: string) {
    this.firstName = value;
  }

  /**
  * Getter $lastName
  * @return {string}
  */
  public get $lastName(): string {
    return this.lastName;
  }

  /**
  * Setter $lastName
  * @param {string} value
  */
  public set $lastName(value: string) {
    this.lastName = value;
  }

  /**
  * Getter $email
  * @return {string}
  */
  public get $email(): string {
    return this.email;
  }

  /**
  * Setter $email
  * @param {string} value
  */
  public set $email(value: string) {
    this.email = value;
  }


  /**
  * Getter $status
  * @return {boolean}
  */
  public get $status(): boolean {
    return this.status;
  }

  /**
  * Setter $status
  * @param {boolean} value
  */
  public set $status(value: boolean) {
    this.status = value;
  }
}
