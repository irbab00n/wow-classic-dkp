/**
 * @interface AuthToken
 * @description
 * Fields available on the AuthToken returned from the OAuth2 interaction with the Classic API
 * @type <object>
 * @key <string>
 * @field token <AuthTokenCredentials>: TBD
 * @returns <AuthTokenCredentials>
 */
export interface AuthToken {
  [key: string]: any;
  token: AuthTokenCredentials;
}

/**
 * @interface AuthTokenCredentials
 * @description
 * Fields available on the AuthToken returned from the OAuth2 interaction with the Classic API
 * @type <object>
 * @key <string>
 * @field access_token <string>: The access token you need to supply either to the Authorization Header, or the access_token query string parameter
 * @field token_type <string>: Value should be 'bearer', incidicating what kind access_token it is
 * @field expires_in <number>: Number of seconds until the token expires; Max = 86399
 * @field expires_at <Date>: Date string for when the token will expire
 * @returns <string> <number> <Date>
 */
export interface AuthTokenCredentials {
  [key: string]: string | number | Date;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: Date;
}
