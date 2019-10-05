import express from 'express';
import axios from 'axios';
import { BasicFunctionOptions } from '../../interfaces/internal/BasicFunctionOptions';
import { PlaceholderObject } from '../../Interfaces/internal/PlaceholderObject';
import { getToken } from './getToken';
import { createAuthHeaders } from './shared';


// ===============
// DEFAULT OPTIONS
// ===============
const _getCharacterDefaultOptions = {
  verbose: false,
};

// ==============
// ERROR MESSAGES
// ==============
const ERROR_PLAYABLE_CLASS_INDEX_FETCH_FAILED = 'playableClassesIndex --- Something went wrong while attempting to retrieve the playable class index from the WoW Classic API';

// ==============
// MODULE CONFIGS
// ==============
// ! If this app is to ever support consumers outside of the US, we will have to address this at that time.
const protocol = 'https';
const region = 'us';
const blizzard_api = 'api.blizzard.com';
const namespace = 'static-classic-us';
const locale = 'en_US';

'https://us.api.blizzard.com/data/wow/playable-class/7?namespace=static-classic-us&locale=en_US&access_token=USfPqP2h82Nd8qBvKAatHEUC4DYsoA3ZJc'


// ==============
// MODULE STORAGE
// ==============

// Module storage for the Item Classes Index
// Item Classes are generic groups of items; 
var playableClassesIndex: null | PlaceholderObject = null;

// =======
// EXPORTS
// =======

// Retrieves the playable classes index from the module storage
// If the module storage hasn't been populated with data from the World of Warcraft API
// It will be retireved and stored within the module
export const getPlayableClassesIndex = async ({ verbose }: BasicFunctionOptions = _getCharacterDefaultOptions) => {
  const playableClassesIndexEndpoint = 'data/wow/playable-class/index';
  if (verbose) {
    console.log('playableClassesIndex --- checking if module playableClassesIndex storage is empty...\n');
  }

  if (playableClassesIndex) {
    if (verbose) {
      console.log('playableClassesIndex --- playableClassesIndex has been retrieved from the module storage...\n');
    }
    return playableClassesIndex;
  } else {
    if (verbose) {
      console.log('playableClassesIndex --- playableClassesIndex is empty; attempting to retrieve list...\n');
    }
    let accessToken = await getToken({ verbose: true });
    let requestURL = `${protocol}://${region}.${blizzard_api}/${playableClassesIndexEndpoint}?namespace=${namespace}&locale=${locale}&access_token=${accessToken}`;
    let requestConfig: PlaceholderObject = createAuthHeaders(accessToken); 
    let retrievedIndex = await axios.get(requestURL, requestConfig);
    if (retrievedIndex) {
      console.log('playableClassesIndex --- playableClassesIndex retrieved!\n');
      console.log('playableClassesIndex --- ', retrievedIndex.data, '\n');
      playableClassesIndex = retrievedIndex.data;
      return retrievedIndex;
    } else {
      console.error('retrieved Index was not the expected result: ', retrievedIndex);
      throw new Error(ERROR_PLAYABLE_CLASS_INDEX_FETCH_FAILED);
    }
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
