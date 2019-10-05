// converts access token into headers config object for Axios
export const createAuthHeaders = (access_token: string) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});