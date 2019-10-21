import Axios from 'axios';
import CircularJSON from 'circular-json';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

import { getItem } from '../blizzard/items';
import { getToken } from '../blizzard/getToken';
import { urlConfig } from '../blizzard/shared';

// look for all files that include dkp-history
// import them
// if the file name includes a valid 8 digit date code; MMDDYYYY
// save it and pass it through
// import the raw data
// normalize into object-based format, passing through the filename, and the date extracted

const filename = 'loot-history-10202019';
const { locale } = urlConfig;

// JSON file writing helper function
const writeDataToJSON = async (data: any, filename: string) => {
  console.log('data from the CSV read: ', data);
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `${filename}.json`),
      CircularJSON.stringify(data)
    );
  } catch (error) {
    console.error(
      'Something went wrong trying to write JSON file: ',
      error.message
    );
  }
};

/**
 *
 * @description
 * Reads the raw CSV data from the Monolith DKP History export
 *
 * Extracts the Headers
 * - Currently just reads the headers
 *
 * Extracts and formats all of the entries into entry objects
 * - Will extract and format the list of attendees as a list of strings
 *
 * Entry object:
 *
 *    {
 *      id: '1570580627',
 *      description: 'DKP Adjust',
 *      recipients: 'Tedium',
 *      value: '230'
 *    }
 */
const normalizeDKPHistoryCSV = (data: any) => {
  try {
    // *----------------*
    // *---- CONFIG ----*
    // *----------------*
    const headerStart = 0;
    const headerEnd = 2;
    // extracts the key/value pairs into an array [['key', 'value'], ...]
    // ! Object.entires has no IE support at all.  Will need to be polyfilled or transpiled to ES5 prior to deployment for full browser support
    const csvEntries = Object.entries(data);
    // console.log('parsed CSV entries: ', csvEntries);

    // *-----------------*
    // *---- HEADERS ----*
    // *-----------------*
    // Each entry from monolith contains some meta-data at the top of the CSV that contains a list of attendees,
    // and a value labeled as the history version.  May be related to the export/update broadcasted for the raid.
    // TODO: Format the headers
    // attendees: ['name', ...]
    // history_id: 5
    let [attendeesString, historyVersion]: any = csvEntries.slice(
      headerStart,
      headerEnd
    );
    let history_version_id = historyVersion[1];
    // TODO: Document what this does and why we need to do this
    let attendees = attendeesString[1].replace('DKPHistory = ', '').split('-');

    // *-----------------*
    // *---- ENTIRES ----*
    // *-----------------*
    let dkpHistoryEntries = []; // stores formatted dkp history entries from loop below
    let entrySize = 4; // each dkp entry has 4 attributes we need to capture // ! VALUE MAY CHANGE

    for (let i = headerEnd; i < csvEntries.length; i += entrySize) {
      // slicing i, through i + entrySize ensures we grab entry 'chunks' of the right size to format
      // ! CAUTION: This value may change depending on versioning/updates from Monolith DKP.
      let [
        entry_id,
        entry_description,
        entry_recipients,
        entry_value,
      ] = csvEntries.slice(i, i + entrySize);

      // TODO: Create an interface for this
      let newEntry: any = {
        entry_id: entry_id ? entry_id[1] : null,
        description: entry_description ? entry_description[1] : null,
        recipients: entry_recipients ? entry_recipients[1] : null,
        value: entry_value ? entry_value[1] : null,
      };

      // If there were multiple recipients, list them out
      if (newEntry.recipients !== null && newEntry.recipients.includes('-')) {
        newEntry.recipients = newEntry.recipients.split('-');
      }

      dkpHistoryEntries.push(JSON.parse(JSON.stringify(newEntry)));
    }
    console.log('\ndkp history entries after format: ', dkpHistoryEntries);
    return {
      headers: {
        history_version_id,
        attendees,
      },
      entries: dkpHistoryEntries,
    };
  } catch (error) {
    console.error(
      'Something went wrong trying to normalize the CSV data: ',
      error.message
    );
  }
};

const normalizeLootHistoryCSV = (data: any) => {
  // console.log('data to normalize from the CSV: ', data);
  // collect the keys of the CSV parse object
  // iterate through the keys and create the
  try {
    const entryLength = 7;
    // ----- CONFIG -----
    const csvEntries: any = Object.entries(data); // extracts the key/value pairs into an array [['key', 'value'], ...]
    // format the first entry
    csvEntries[0][1] = csvEntries[0][1].replace('LootHistory = ', '');
    let formattedEntries = csvEntries.map((entry: any) => entry[1]);
    // console.log('parsed CSV entries: ', formattedEntries);

    // ----- ENTIRES -----
    let lootHistoryEntries = [];
    for (let i = 0; i < formattedEntries.length; i += entryLength) {
      let [
        recipient,
        item,
        item_id,
        zone,
        boss,
        date,
        cost,
      ] = formattedEntries.slice(i, i + entryLength);
      lootHistoryEntries.push({
        recipient,
        item,
        item_id,
        zone,
        boss,
        date,
        cost,
      });
    }
    console.log('formatted loot history entries: ', lootHistoryEntries);

    return lootHistoryEntries;
  } catch (error) {
    console.error(
      'Something went wrong trying to normalize the CSV data: ',
      error.message
    );
  }
};

// Reads the csv data, and runs it through the normalization function
// TODO:
export const parserTest = () => {
  try {
    fs.createReadStream(path.resolve(__dirname, `${filename}.csv`))
      .pipe(csv())
      .on('data', async (data: any) => {
        // Normalize the data
        let normalizedData = normalizeLootHistoryCSV(data);

        // Expand the item data
        let mappedData = normalizedData.map(async (dataEntry: any) => {
          let itemData = await getItem(dataEntry.item_id, { verbose: false });
          dataEntry.item = itemData;

          return dataEntry;
        });
        let fullMappedData = await Promise.all(mappedData);

        let accessToken = await getToken();

        let itemDataWithMedia = fullMappedData.map(async (itemEntry: any) => {
          // console.log(itemEntry);
          let media = await Axios.get(
            `${itemEntry.item.media.key.href}&locale=${locale}&access_token=${accessToken}`
          );
          itemEntry.item.media = media.data;
          return itemEntry;
        });
        let fullMappedDataWithMedia = await Promise.all(itemDataWithMedia);
        console.log('full mapped loot history data: ', fullMappedDataWithMedia);
        writeDataToJSON(fullMappedData, `${filename}-normalized`);
      });
  } catch (error) {
    console.error(
      'Something went wrong trying to parse the CSV into JSON: ',
      error.message
    );
  }
};
