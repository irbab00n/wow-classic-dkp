import Axios from 'axios';
import { BlizzardAuthHeaders } from '../../interfaces/blizzard/AuthHeaders';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders, urlConfig } from './shared';

// ----------------------------------------------------------------------------
// DEFAULT OPTIONS ------------------------------------------------------------
// ----------------------------------------------------------------------------

const _getItemClassesIndexDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

const _getItemClassDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

const _getItemSubclassDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

const _getItemMediaDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

const _getItemDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

// ----------------------------------------------------------------------------
// MODULE STORAGE -------------------------------------------------------------
// ----------------------------------------------------------------------------

// Module storage for the Item Classes Index
// Item Classes are generic groups of items
var itemClassesIndex: null | PlaceholderObject = null;

// ----------------------------------------------------------------------------
// EXPORTS --------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Module storage for the Item Classes Index
// Item Classes are generic groups of items;

export const getItemClassesIndex = async ({
  verbose,
}: BasicFunctionOptions = _getItemClassesIndexDefaultOptions) => {
  // API ENDPOINT
  const itemClassesIndexEndpoint = 'data/wow/item-class/index';

  if (verbose) {
    console.log(
      'getItemClassesIndex --- checking if module itemClassesIndex storage is empty...\n'
    );
  }

  if (itemClassesIndex) {
    if (verbose) {
      console.log(
        'getItemClassesIndex --- itemClassesIndex has been retrieved from the module storage...\n'
      );
      console.log('itemClassesIndex --- ', itemClassesIndex, '\n');
    }

    return itemClassesIndex;
  } else {
    if (verbose) {
      console.log(
        'getItemClassesIndex --- itemClassesIndex is empty; attempting to retrieve list...\n'
      );
    }

    try {
      const { protocol, region, domain, namespace, locale } = urlConfig;
      let accessToken = await getToken();
      let requestURL = `${protocol}://${region}.${domain}/${itemClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
      let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
      let retrievedIndex = await Axios.get(requestURL, requestConfig);

      if (verbose) {
        console.log('getItemClassesIndex --- itemClassesIndex retrieved!\n');
        console.log('getItemClassesIndex --- ', retrievedIndex.data, '\n');
      }

      itemClassesIndex = retrievedIndex.data;

      return retrievedIndex.data;
    } catch (error) {
      // TODO: Create a more robust error message
      console.error(error);
    }
  }
};

export const getItemClass = async (
  itemClassId: number,
  { verbose }: BasicFunctionOptions = _getItemClassDefaultOptions
) => {
  // API ENDPOINT
  const itemClassEndpoint = '/data/wow/item-class';

  if (verbose) {
    console.log(
      'getItemClass --- retrieving the supplied class: ',
      itemClassId,
      '\n'
    );
  }

  try {
    const { protocol, region, domain, namespace, locale } = urlConfig;
    let accessToken = await getToken();
    let requestURL = `${protocol}://${region}.${domain}/${itemClassEndpoint}/${itemClassId}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
    let retrievedItemClass = await Axios.get(requestURL, requestConfig);

    if (verbose) {
      console.log('getItemClass --- ItemClass retrieved!\n');
      console.log('getItemClass --- ', retrievedItemClass.data, '\n');
    }

    return retrievedItemClass.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemSubclass = async (
  itemClassId: number,
  itemSubclassId: number,
  { verbose }: BasicFunctionOptions = _getItemSubclassDefaultOptions
) => {
  // API ENDPOINT
  const itemSubclassEndpoint: string = `/data/wow/item-class/${itemClassId}/item-subclass/${itemSubclassId}`;

  if (verbose) {
    console.log(
      'getItemSubclass --- retrieving the supplied class: ',
      itemClassId,
      itemSubclassId,
      '\n'
    );
  }

  try {
    const { protocol, region, domain, namespace, locale } = urlConfig;
    let accessToken = await getToken();
    let requestURL = `${protocol}://${region}.${domain}/${itemSubclassEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
    let retrievedItemSubclass = await Axios.get(requestURL, requestConfig);

    if (verbose) {
      console.log('getItemSubclass --- Item Sublcass retrieved!\n');
      console.log('getItemSubclass --- ', retrievedItemSubclass.data, '\n');
    }

    return retrievedItemSubclass.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @async
 * @function getItemMedia
 *
 * @description
 * Retrieves the Item Media for a given Item ID
 *
 * Available properties on results:
 * - _links
 * - assets
 *  -> key, value
 *
 *
 * @param itemId Id of the item you wish to retrieve the media for
 * @param options Basic Function Options object
 *
 * @returns TBD
 */
export const getItemMedia = async (
  itemId: number,
  { verbose }: BasicFunctionOptions = _getItemMediaDefaultOptions
) => {
  // API ENDPOINT
  const itemMediaEndpoint = '/data/wow/media/item';

  if (verbose) {
    console.log(
      'getItemMedia --- retrieving the supplied class: ',
      itemId,
      '\n'
    );
  }

  try {
    const { protocol, region, domain, namespace, locale } = urlConfig;
    let accessToken = await getToken();
    let requestURL = `${protocol}://${region}.${domain}/${itemMediaEndpoint}/${itemId}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
    let retrievedItemMedia = await Axios.get(requestURL, requestConfig);

    if (verbose) {
      console.log('getItemMedia --- Item retrieved!\n');
      console.log('getItemMedia --- ', retrievedItemMedia.data, '\n');
    }

    return retrievedItemMedia.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItem = async (
  itemId: number,
  { verbose }: BasicFunctionOptions = _getItemDefaultOptions
) => {
  // API ENDPOINT
  const itemEndpoint = '/data/wow/item';

  if (verbose) {
    console.log('getItem --- retrieving the supplied item: ', itemId, '\n');
  }

  try {
    const { protocol, region, domain, namespace, locale } = urlConfig;
    let accessToken = await getToken();
    let requestURL = `${protocol}://${region}.${domain}/${itemEndpoint}/${itemId}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
    let retrievedItemMedia = await Axios.get(requestURL, requestConfig);

    if (verbose) {
      console.log('getItem --- Item retrieved!\n');
      console.log('getItem --- ', retrievedItemMedia.data, '\n');
    }

    return retrievedItemMedia.data;
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------------------------------------------
// ITEM UTILITY EXPORTS -------------------------------------------------------
// ----------------------------------------------------------------------------

/**
 * @async
 * @function retrieveItemSubclasses
 *
 * @description
 * This function will use a list of the retrieved item class objects from the
 * WoW Classic Game Data API, which contain nested request links to pull enriched
 * data from their API.
 *
 * This function maps across all of the item classes, retrieving all of the subclasses
 * for the master class group.  The results of this query are extended over the class object,
 * creating an enriched set of item class and subclass data.
 *
 * @param itemClassesIndex The Item Classes Index retreived from the WoW Classic Game Data API
 *
 * @returns <Promise> - A combined Item Class list with mapped Subclasses
 *
 * TODO:  Replace the itemClassesIndex interface definition
 * TODO:  Replace the function signature
 */
export const retrieveItemSubclasses = async (
  itemClassesIndex: any[]
): Promise<any[]> => {
  const { locale } = urlConfig;
  let accessToken = await getToken();

  try {
    let mappedClasses = itemClassesIndex.map((itemClass: any) => {
      return new Promise((resolve, reject) =>
        Axios.get(
          `${itemClass.key.href}&locale=${locale}&access_token=${accessToken}`
        )
          .then((results: any) => {
            // console.log('results of getting the item class: ', results);
            resolve(Object.assign(itemClass, results.data)); // <-- This is where the extension happens
          })
          .catch((error: any) => {
            // console.log('something went wrong attempting to fetch the item subclass: ', error);
            reject(error);
          })
      );
    });

    let combinedResults = await Promise.all(mappedClasses);
    return combinedResults;
  } catch (error) {
    console.error(
      'Something went wrong retrieving the item Subclasses: ',
      error
    );
  }
};
