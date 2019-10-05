import { URLConfig } from '../../interfaces/blizzard/URLConfig';

export const urlConfig: URLConfig = {
  protocol: 'https',
  region: 'us',
  domain: 'api.blizzard.com',
  namespace: 'static-classic-us',
  locale: 'en_US',
};

// converts access token into headers config object for Axios
export const createAuthHeaders = (access_token: string) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
