import axios from 'axios';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders, urlConfig } from './shared';

// ===============
// DEFAULT OPTIONS
// ===============
const _getCharacterDefaultOptions = {
  verbose: false,
};

// ==============
// ERROR MESSAGES
// ==============
const ERROR_PLAYABLE_CLASS_INDEX_FETCH_FAILED =
  'getPlayableClassesIndex --- Something went wrong while attempting to retrieve the playable class index from the WoW Classic API';

// ==============
// MODULE STORAGE
// ==============

// Module storage for the Playable Classes Index
// Playable Classes contain the name of the class as well as a class_id that we can use to inject into other queries
var playableClassesIndex: null | PlaceholderObject = null;

// =======
// EXPORTS
// =======

// Retrieves the playable classes index from the module storage
// If the module storage hasn't been populated with data from the World of Warcraft API
// It will be retireved and stored within the module
export const getPlayableClassesIndex = async ({
  verbose,
}: BasicFunctionOptions = _getCharacterDefaultOptions) => {
  // API ENDPOINT
  const playableClassesIndexEndpoint = 'data/wow/playable-class/index';

  if (verbose) {
    console.log(
      'playableClassesIndex --- checking if module playableClassesIndex storage is empty...\n'
    );
  }

  if (playableClassesIndex) {
    if (verbose) {
      console.log(
        'playableClassesIndex --- playableClassesIndex has been retrieved from the module storage...\n'
      );
      console.log('playableClassesIndex --- ', playableClassesIndex, '\n');
    }

    return playableClassesIndex;
  } else {
    if (verbose) {
      console.log(
        'playableClassesIndex --- playableClassesIndex is empty; attempting to retrieve list...\n'
      );
    }

    try {
      const { protocol, region, domain, namespace, locale } = urlConfig;

      let accessToken = await getToken();
      let requestURL = `${protocol}://${region}.${domain}/${playableClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
      let requestConfig: PlaceholderObject = createAuthHeaders(accessToken);
      let retrievedIndex = await axios.get(requestURL, requestConfig);

      if (verbose) {
        console.log(
          'playableClassesIndex --- playableClassesIndex retrieved!\n'
        );
        console.log('playableClassesIndex --- ', retrievedIndex.data, '\n');
      }

      // Set the retrieved data in the module storage for later
      playableClassesIndex = retrievedIndex.data;

      // Then return it to the user
      return retrievedIndex.data;
    } catch (error) {
      // TODO: Write a more robust error message format that will allow me to crack open the error supplied in the catch block and display it easily in the console
      console.error(ERROR_PLAYABLE_CLASS_INDEX_FETCH_FAILED, error);
    }

    // ! Keeping this here for now as a reference if we need to move from the async/await pattern
    // return axios.get(requestURL, requestConfig)
    //   .then((results: any) => {
    //     console.log('playableClassesIndex --- playableClassesIndex retrieved!\n');
    //     console.log('playableClassesIndex --- ', results.data, '\n');
    //     playableClassesIndex = results.data;
    //     return results.data;
    //   })
    //   .catch((error: any) => {
    //     console.log('playableClassesIndex --- Something went wrong while attempting to retrieve the Item Classes Index: ', error);
    //   });
  }
};
