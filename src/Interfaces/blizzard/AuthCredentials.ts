import { BlizzardAuthClient } from './AuthClient';
import { BlizzardAuthHost } from './AuthHost';

export interface BlizzardAuthCredentials {
  client: BlizzardAuthClient;
  auth: BlizzardAuthHost;
}
