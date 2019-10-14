import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

// look for all files that include dkp-history
// import them
// if the file name includes a valid 8 digit date code; MMDDYYYY
// save it and pass it through
// import the raw data
// normalize into object-based format, passing through the filename, and the date extracted

const filename = 'dkp-history';

// JSON file writing helper function
const writeDataToJSON = async (data: any, filename: string) => {
  console.log('data from the CSV read: ', data);
  try {
    fs.writeFileSync(
      path.resolve(__dirname, `${filename}.json`),
      JSON.stringify(data)
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
 * Reads the raw CSV data from the Monolith DKP export
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
const normalizeMonolithCSV = (data: any) => {
  // console.log('data to normalize from the CSV: ', data);
  // collect the keys of the CSV parse object
  // iterate through the keys and create the
  try {
    // ----- CONFIG -----
    const headerStart = 0;
    const headerEnd = 2;
    const csvEntries = Object.entries(data); // extracts the key/value pairs into an array [['key', 'value'], ...]
    // console.log('parsed CSV entries: ', csvEntries);

    // ----- HEADERS -----
    // TODO: Format the headers
    // attendees: ['name', ...]
    // history_id: 5
    let [attendeesString, historyVersion]: any = csvEntries.slice(
      headerStart,
      headerEnd
    );
    let history_version_id = historyVersion[1];
    let attendees = attendeesString[1].replace('DKPHistory = ', '').split('-');

    // ----- ENTIRES -----
    let dkpHistoryEntries = [];
    for (let i = headerEnd; i < csvEntries.length; i += 4) {
      let [
        entry_id,
        entry_description,
        entry_recipients,
        entry_value,
      ] = csvEntries.slice(i, i + 4);

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

// Reads the csv data, and runs it through the normalization function
// TODO:
export const parserTest = async () => {
  try {
    fs.createReadStream(path.resolve(__dirname, `${filename}.csv`))
      .pipe(csv())
      .on('data', (data: any) => {
        let normalizedData = normalizeMonolithCSV(data);
        writeDataToJSON(normalizedData, `${filename}-normalized`);
      });
  } catch (error) {
    console.error(
      'Something went wrong trying to parse the CSV into JSON: ',
      error.message
    );
  }
};
