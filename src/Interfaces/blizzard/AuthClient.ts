/**
 * @interface BlizzardAuthClient
 * @type <object>
 * @key <string>
 * @field id <string>: Blizzard Authentication Client ID provided by developer portal
 * @field secret <string>: Blizzard Authentication Client Secret provided by developer portal
 * @returns <string>
 */
export interface BlizzardAuthClient {
  [key: string]: string;
  id: string;
  secret: string;
}
