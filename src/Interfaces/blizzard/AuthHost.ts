/**
 * @interface BlizzardAuthHost
 * @description
 * Header object that allows for the Authorization header to be passed into the API
 * @type <object>
 * @key <string>
 * @field tokenHost <string>: TBD
 * @returns <string>
 */
export interface BlizzardAuthHost {
  [key: string]: string;
  tokenHost: string;
}
