import Axios from 'axios';
import { BlizzardAuthHeaders } from '../../interfaces/blizzard/AuthHeaders';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders, urlConfig } from './shared';

// ----------------------------------------------------------------------------
// DEFAULT OPTIONS ------------------------------------------------------------
// ----------------------------------------------------------------------------

const _getCreatureFamiliesIndexDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

const _getCreatureFullCreatureFamiliesDefaultOptions: BasicFunctionOptions = {
  verbose: false,
};

// ----------------------------------------------------------------------------
// MODULE STORAGE -------------------------------------------------------------
// ----------------------------------------------------------------------------

// Module storage for the Creature Families Index
// Creature Families are generic groups of monster types; cat, wolf, spider, etc...
var creatureFamiliesIndex: null | PlaceholderObject = null;

// ----------------------------------------------------------------------------
// EXPORTS --------------------------------------------------------------------
// ----------------------------------------------------------------------------

// Retrieves the Creatures Families Index from the World of Warcraft Classic Game Data API
export const getCreatureFamiliesIndex = async ({
  verbose,
}: BasicFunctionOptions = _getCreatureFamiliesIndexDefaultOptions) => {
  // API ENDPOINT
  const creatureFamiliesIndexEndpoint = 'data/wow/creature-family/index';
  if (verbose) {
    console.log(
      'getCreatureFamiliesIndex --- checking if module creatureFamiliesIndex storage is empty...\n'
    );
  }
  if (creatureFamiliesIndex) {
    if (verbose) {
      console.log(
        'getCreatureFamiliesIndex --- creatureFamiliesIndex has been retrieved from the module storage...\n'
      );
      console.log('creatureFamiliesIndex --- ', creatureFamiliesIndex, '\n');
    }
    return creatureFamiliesIndex;
  } else {
    if (verbose) {
      console.log(
        'getCreatureFamiliesIndex --- creatureFamiliesIndex is empty; attempting to retrieve list...\n'
      );
    }
    try {
      const { protocol, region, domain, namespace, locale } = urlConfig;
      let accessToken = await getToken();
      let requestURL = `${protocol}://${region}.${domain}/${creatureFamiliesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
      let requestConfig: BlizzardAuthHeaders = createAuthHeaders(accessToken);
      let retrievedIndex = await Axios.get(requestURL, requestConfig);
      if (verbose) {
        console.log(
          'getCreatureFamiliesIndex --- creatureFamiliesIndex retrieved!\n'
        );
        console.log('getCreatureFamiliesIndex --- ', retrievedIndex.data, '\n');
      }
      creatureFamiliesIndex = retrievedIndex.data;
      return retrievedIndex.data;
    } catch (error) {
      // TODO: Create a more robust error message
      console.error(error);
    }
  }
};

// ----------------------------------------------------------------------------
// ITEM UTILITY EXPORTS -------------------------------------------------------
// ----------------------------------------------------------------------------

// Utilizes the getCreatureFamiliesIndex to retrieve the Creature Family Index
// After the list is retrieved, the Creature Family self-find API link will be requested
// to retireve the more expanded Creature Family object
// After all Creature Families have been enriched, the list of enriched Families will be
// mapped through one remaining time to use the supplied media self-find API link
// to retrieve the Creature Family Media assets
export const getFullCreatureFamilies = async ({
  verbose,
}: BasicFunctionOptions = _getCreatureFullCreatureFamiliesDefaultOptions) => {
  const { locale } = urlConfig;
  try {
    let accessToken = await getToken();
    let { creature_families } = await getCreatureFamiliesIndex({ verbose }); // Retrieve the Creature Family Index
    let mappedCreatureFamilies = creature_families.map(
      (creatureFamily: any) => {
        // Use the supplied Creature Family self-find link
        return new Promise((resolve, reject) => {
          return Axios.get(
            `${creatureFamily.key.href}&locale=${locale}&access_token=${accessToken}`
          )
            .then((result: any) => {
              let mappedResult = Object.assign(creatureFamily, result.data);
              if (mappedResult.hasOwnProperty('key')) delete mappedResult.key;
              resolve(mappedResult);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
      }
    );
    let arrivedMappedCreatureFamilies = await Promise.all(
      mappedCreatureFamilies
    ); // Await for all Promise-mapped creature family requests to return
    let mappedCreatureFamiliesWithMedia = arrivedMappedCreatureFamilies.map(
      (creatureFamily: any) => {
        // Similar to before, use supplied Creature Family Media self-find links
        if (creatureFamily.hasOwnProperty('media')) {
          // Not all objects in the list contained a media object
          return new Promise((resolve, reject) =>
            Axios.get(
              `${creatureFamily.media.key.href}&locale=${locale}&access_token=${accessToken}`
            )
              .then((result: any) => {
                let newCreatureFamilyWithMedia = Object.assign(
                  {},
                  creatureFamily
                ); // create a copy of the creature family
                newCreatureFamilyWithMedia.media = Object.assign(
                  newCreatureFamilyWithMedia.media,
                  result.data
                ); // then extend the media object of the new creature family
                resolve(newCreatureFamilyWithMedia); // then return it out of the promise
              })
              .catch((error: any) => {
                reject(error);
              })
          );
        } else {
          return creatureFamily;
        }
      }
    );
    let combinedMediaResults = await Promise.all(
      mappedCreatureFamiliesWithMedia
    );
    if (verbose) {
      console.log(
        '\n\n\n',
        'Logging the final results: ',
        combinedMediaResults
      );
      console.log('combined results: ', combinedMediaResults);
    }
    return combinedMediaResults;
  } catch (error) {
    console.log('something went wrong:\n\n\n', error);
  }
};
