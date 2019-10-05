/**
 * @interface BlizzardAuthHeaders
 * @description
 * A standard axios request config object that allows us to pass in the access token to be applied as a Header
 *
 * Note: Utilizes Authorization: Bearer < TOKEN >
 * @type <object>
 * @key <string>
 * @field headers <AuthHeader>: Header object that allows for the Authorization header to be passed into the API
 * @returns <AuthHeader>
 */
export interface BlizzardAuthHeaders {
  [key: string]: AuthHeader;
  headers: AuthHeader;
}

/**
 * @interface AuthHeader
 * @description
 * Header object that allows for the Authorization header to be passed into the API
 * @type <object>
 * @key <string>
 * @field Authorization <string>: MUST contain 'Bearer ' (including the space) before the access token retrieved from the getToken method.
 * @returns <string>
 */
interface AuthHeader {
  [key: string]: string;
  Authorization: string;
}
