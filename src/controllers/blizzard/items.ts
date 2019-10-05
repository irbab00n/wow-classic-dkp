import axios from 'axios';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders } from './shared';

// ===============
// DEFAULT OPTIONS
// ===============
const _getCharacterDefaultOptions = {
  verbose: false,
};

// ==============
// MODULE CONFIGS
// ==============
// ! If this app is to ever support consumers outside of the US, we will have to address this at that time.
const protocol = 'https';
const region = 'us';
const domain = 'api.blizzard.com';
const namespace = 'static-classic-us';
const locale = 'en_US';

// ==============
// MODULE STORAGE
// ==============

// Module storage for the Item Classes Index
// Item Classes are generic groups of items
var itemClassesIndex: null | PlaceholderObject = null;

// =======
// EXPORTS
// =======

// Module storage for the Item Classes Index
// Item Classes are generic groups of items;

export const getItemClassesIndex = async ({
  verbose,
}: BasicFunctionOptions = _getCharacterDefaultOptions) => {
  // API ENDPOINT
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
      console.log('itemClassesIndex --- ', itemClassesIndex, '\n');
    }

    return itemClassesIndex;
  } else {
    if (verbose) {
      console.log(
        'itemClassesIndex --- itemClassesIndex is empty; attempting to retrieve list...\n'
      );
    }

    try {
      let accessToken = await getToken();
      let requestURL = `${protocol}://${region}.${domain}/${itemClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
      let requestConfig: PlaceholderObject = createAuthHeaders(accessToken);
      let retrievedIndex = await axios.get(requestURL, requestConfig);

      if (verbose) {
        console.log('itemClassesIndex --- itemClassesIndex retrieved!\n');
        console.log('itemClassesIndex --- ', retrievedIndex.data, '\n');
      }

      itemClassesIndex = retrievedIndex.data;

      return retrievedIndex.data;
    } catch (error) {
      // TODO: Create a more robust error message
      console.error(error);
    }
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
