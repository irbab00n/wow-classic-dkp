import axios from 'axios';
import { BlizzardAuthHeaders } from '../../interfaces/blizzard/AuthHeaders';
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
      const { protocol, region, domain, namespace, locale } = urlConfig;
      let accessToken = await getToken();
      let requestURL = `${protocol}://${region}.${domain}/${itemClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
      let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
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
