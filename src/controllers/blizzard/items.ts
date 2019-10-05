import express from 'express';
import axios from 'axios';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../Interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders } from './shared';

// ==============
// MODULE CONFIGS
// ==============
// ! If this app is to ever support consumers outside of the US, we will have to address this at that time.
const protocol = 'https';
const region = 'us';
const blizzard_api = 'api.blizzard.com';
const namespace = 'static-classic-us';
const locale = 'en_US';

// 'https://us.api.blizzard.com/data/wow/item-class/index?namespace=static-classic-us&locale=en_US&access_token=USIAYENhtI5XT12uEu8kbcsCtuch7YsdGt'

// ===============
// DEFAULT OPTIONS
// ===============
const _getCharacterDefaultOptions = {
  verbose: false,
};

// =======
// EXPORTS
// =======

// Module storage for the Item Classes Index
// Item Classes are generic groups of items;
var itemClassesIndex: null | PlaceholderObject = null;

export const getItemClassesIndex = async ({
  verbose,
}: BasicFunctionOptions = _getCharacterDefaultOptions) => {
  const itemClassesIndexEndpoint = 'data/wow/item-class/index';
  if (verbose) {
    console.log(
      'itemClassesIndex --- checking if module itemClassesIndex storage is empty...\n'
    );
  }

  if (itemClassesIndex) {
    if (verbose) {
      console.log(
        'itemClassesIndex --- itemClassesIndex has been retrieved from the module storage...\n'
      );
    }
    return itemClassesIndex;
  } else {
    if (verbose) {
      console.log(
        'itemClassesIndex --- itemClassesIndex is empty; attempting to retrieve list...\n'
      );
    }
    let accessToken = await getToken({ verbose: true });
    let requestURL = `${protocol}://${region}.${blizzard_api}/${itemClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: PlaceholderObject = createAuthHeaders(accessToken);
    return axios
      .get(requestURL, requestConfig)
      .then((results: any) => {
        console.log('itemClassesIndex --- itemClassesIndex retrieved!\n');
        console.log('itemClassesIndex --- ', results.data, '\n');
        itemClassesIndex = results.data;
        return results.data;
      })
      .catch((error: any) => {
        console.log(
          'itemClassesIndex --- Something went wrong while attempting to retrieve the Item Classes Index: ',
          error
        );
      });
  }
};

// ========
// EXAMPLES
// ========
// gets the entire character profile, leveraging all
// export const getCharacter = (
//   request: express.Request,
//   response: express.Response,
//   options: BasicFunctionOptions = _getCharacterDefaultOptions // TODO:  Remove this, the options aren't sent
// ) => {
//   const { characterName, realmSlug } = request.query;
//   const { verbose } = options;

//   if (verbose) console.log('~*~*~*~ Running the getCharacter method ~*~*~*~');

//   Promise.all([
//     getCharacterProfile(characterName, realmSlug),
//   ])
//     .then(results => {
//       // console.log(' +++++ Results from Promise.all: ', flattenResults(results));
//       response.status(200).send(flattenResults(results));
//     })
//     .catch(errors => {
//       console.log(
//         ' xxxxx Any Errors that have occurred during Promise.all: ',
//         errors
//       );
//       response.status(400).send(errors);
//     });
// };

// // grabs the access token and gets character profile
// export const getCharacterProfile = (
//   characterName: string,
//   realmSlug: string
// ) => {
//   return getToken({ verbose: false }).then((access_token: string) => {
//     let fullLink = `https://${region}.${blizzard_api}/${characterPath}/${realmSlug}/${characterName}?namespace=profile-us`;
//     let config = createAuthHeaders(access_token);
//     return axios.get(fullLink, config).then(result => {
//       return { profile: result.data };
//     });
//   });
// };
