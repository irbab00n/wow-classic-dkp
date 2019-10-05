import { AuthToken } from '../../interfaces/blizzard/AuthToken';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../interfaces/internal/PlaceholderObject';
import credentials from '../../templates/blizzardCredentials';

const oauth2 = require('simple-oauth2').create(credentials);

// Default options for the getToken module
const _defaultOptions: BasicFunctionOptions = {
  verbose: true,
};

// Module storage for the token
// TODO: Define the interface for the token and replace this placeholder
var token: null | PlaceholderObject = null;

/**
 * @function getToken
 * @description
 * This function uses closure to access and operate off of the module-declared token variable.
 *
 * Every time that this function is called, the idea is that it will
 * return only the string-based access token to be used in every single
 * Blizzard API call.
 *
 * If the token doesn't exist it will retrieve one,
 * set it into the module storage and then return the access token.
 *
 * If the token already exists, then it will return the access token directly
 * @param options Config options object for the getToken method.
 */
export const getToken = ({
  verbose,
}: BasicFunctionOptions = _defaultOptions) => {
  if (verbose) {
    console.log('-------------------------------------------- \n');
    console.log('~*~ Blizzard Controller: getToken module --- running... \n');
    console.log('-------------------------------------------- \n');
    console.log(
      '~*~ Blizzard Controller: getToken module --- Current State of the token:\n\n',
      token,
      '\n'
    );
  }
  // If the token is null or it has expired
  if (token === null || token.expired()) {
    if (verbose) {
      console.log('-------------------------------------------- \n');
      console.log(
        '~*~ Blizzard Controller: getToken module --- Token is either null or it has expired... \n'
      );
      console.log(
        '~*~ Blizzard Controller: getToken module --- Attempting to now retreive a new token... \n'
      );
      console.log('-------------------------------------------- \n');
    }
    // Returns the result of an async call to get the client credentials where
    // oauth creates an access token, and then sets the module token storage to
    // the access token that returns from the oauth token
    return oauth2.clientCredentials
      .getToken()
      .then(oauth2.accessToken.create)
      .then((newToken: AuthToken) => {
        if (verbose) {
          console.log('-------------------------------------------- \n');
          console.log(
            '~*~ Blizzard Controller: getToken module --- Token retreived successfully from Blizzard oauth protocol:\n\n',
            newToken,
            '\n'
          );
          console.log('-------------------------------------------- \n');
        }
        token = newToken;
        return newToken.token.access_token;
      })
      .catch((error: any) => {
        console.log(
          '***** Something went wrong fetching the access token:\n\n',
          error,
          '\n\n'
        );
      });
  } else {
    console.log('-------------------------------------------- \n');
    console.log(
      '~*~ Blizzard Controller: getToken module --- A token exists already and it is not expired; returning it directly to the user \n'
    );
    console.log('-------------------------------------------- \n');
    return Promise.resolve(token.token.access_token);
  }
};
