import { BlizzardAuthClient } from './AuthClient';
import { BlizzardAuthHost } from './AuthHost';

/**
 * @interface BlizzardAuthCredentials
 * @type <object>
 * @key <string>
 * @field client <BlizzardAuthClient>: Blizzard Authentication Client configuration
 * @field auth <BlizzardAuthHost>: Blizzard Authentication Client Secret provided by developer portal
 * @returns <BlizzardAuthClient> | <BlizzardAuthHost>
 */
export interface BlizzardAuthCredentials {
  [key: string]: BlizzardAuthClient | BlizzardAuthHost;
  client: BlizzardAuthClient;
  auth: BlizzardAuthHost;
}
