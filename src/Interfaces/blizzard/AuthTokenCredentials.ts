export interface AuthTokenCredentials {
  [key: string]: string | number | Date;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: Date;
}
