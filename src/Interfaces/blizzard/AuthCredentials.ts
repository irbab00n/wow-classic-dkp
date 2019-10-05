import { BlizzardAuthClient } from './AuthClient';
import { BlizzardAuthHost } from './AuthHost';

export interface BlizzardAuthCredentials {
  [key: string]: BlizzardAuthClient | BlizzardAuthHost;
  client: BlizzardAuthClient;
  auth: BlizzardAuthHost;
}
