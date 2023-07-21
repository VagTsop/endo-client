export class RoleDTO {
  name: string;
  authorities: string[];

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
* Getter $authorities
* @return {string[]}
*/
  public get $authorities(): string[] {
    return this.authorities;
  }

  /**
   * Setter $authorities
   * @param {string[]} value
   */
  public set $authorities(value: string[]) {
    this.authorities = value;
  }
}
