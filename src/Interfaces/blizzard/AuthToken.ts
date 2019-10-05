import { AuthTokenCredentials } from './AuthTokenCredentials';

export interface AuthToken {
  [key: string]: any;
  token: AuthTokenCredentials;
}
