import { BasicFunctionOptions } from './interfaces/internal/BasicFunctionOptions';
import { readdirSync } from 'fs';
import path from 'path';

const consoleKey = '~*~ STARTUP';

// MODULE DEFAULTS
const _defaultStartupOptions: BasicFunctionOptions = {
  verbose: false,
};

// MODULE ERRORS
const ERR_NO_FILES_ARRAY_SUPPLIED_TO_TEST: string =
  'Failure @ testFilesForStartupScript --- Param `input` requires an Array to be supplied';

// Used to test string values if they contain or ARE the name of our intended startup scripts
// Script names to target:  startup.ts, startup.js
const startupFileRegExp: RegExp = /startup\.(ts|js)/g;

/**
 * @function testFilesForStartupScript
 * @description
 * Will iterate through all filenames within a controller directory,
 * testing if the filename contains 'startup.ts' or 'startup.js'
 * @param files List of filenames within a directory
 * @returns <String> - Filename found during RegExp matching | <Boolean> - No filename was found, indicating with a clear flag
 */
const testFilesForStartupScript = (files: string[]): boolean | string => {
  if (!Array.isArray(files)) {
    throw new TypeError(ERR_NO_FILES_ARRAY_SUPPLIED_TO_TEST);
  }
  return files.reduce((result: boolean, file: string) => {
    if (startupFileRegExp.test(file)) {
      return file;
    }
    return result;
  }, false);
};

/**
 * @function searchDirectoryForStartup
 * @description
 * Will retrieve all content from a supplied directory name,
 * using the testFilesForStartupScript function to find and respond
 * to whether the directory contains a startup script.
 *
 * To start a controller module:
 * -----------------------------
 *
 * Include a `startup.js` or `startup.ts` file inside the absolute root
 * of the directory you wish to initialize.
 *
 * This module relies on this convention to be followed.  Diverting from it
 * without frist modifying how we detect and run startup script files will
 * result in breaking changes and should be avoided.
 *
 * @param directory Name of the directory to test if it contains a startup script
 * @param {Object} options Options settings
 */
const searchDirectoryForStartup = (
  directory: string,
  options: BasicFunctionOptions
) => {
  if (options.verbose) {
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Resolving directory path for controller module:\n\n  ${directory}\n`
    );
  }
  // Construct the directory path from the supplied string
  const directoryPath = path.resolve(__dirname, 'controllers', directory);
  if (options.verbose) {
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Directory path for the current controller:\n\n  ${directoryPath}\n`
    );
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Retriving all content for the ${directory} controller...`
    );
  }
  // Read the content within the directoryPath
  const directoryRead = readdirSync(directoryPath);
  if (options.verbose) {
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Directory root filenames retrieved from ${directory} controller:\n\n  ${directoryRead}\n`
    );
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Calling the testFilesForStartupScript function with the list of file names retrieved...`
    );
  }
  // Test the list of files produced above to see if it contains a start up script
  let startupSearchResult = testFilesForStartupScript(directoryRead);
  if (options.verbose) {
    console.log(
      `${consoleKey}: searchDirectoryForStartup --- Result of the testFilesForStartupScript function:\n\n  ${startupSearchResult}\n`
    );
  }
  // If the test found a filename, use the string name to import the file, running the startup script
  if (typeof startupSearchResult === 'string') {
    if (options.verbose) {
      console.log(
        `${consoleKey}: searchDirectoryForStartup --- Startup script was found... importing to initialze...`
      );
    }
    require(`${directoryPath}/${startupSearchResult}`);
  }
};

/**
 * @function startup
 * @description
 * Will go through all of the `controllers` for the API,
 * searching within each individual controller directory for a startup script
 * that is *OPTIONAL* at the root of the controller.
 *
 * If it finds a valid startup script format, then it will run the script
 *
 *
 * The Purpose of this Module
 * --------------------------
 *
 * Allows me to be lazy and have a indeterminate number of controllers start up automatically
 * without me having to manually import it.  Laziness pays off once the controller directories
 * start to climb in numbers.
 *
 * With respect to the words of a great man named Bill Pollock,
 * returns Biscuits and Gravy
 *
 * @param options Global options settings for the startup script.
 */
const startup = (options: BasicFunctionOptions = _defaultStartupOptions) => {
  if (options.verbose) {
    console.log(
      `${consoleKey}: startup --- Startup script beginning start up sequence...`
    );
    console.log(
      `${consoleKey}: startup --- Resolving the path of the controllers module...`
    );
  }
  // Construct the directory path to the controllers directory
  const controllerPath = path.resolve(__dirname, 'controllers');
  if (options.verbose) {
    console.log(
      `${consoleKey}: startup --- Resolved controller path:\n\n  ${controllerPath}\n`
    );
    console.log(
      `${consoleKey}: startup --- Retrieving all content from the controllers module...`
    );
  }
  // Read the content within the controllerPath
  const directoryRead = readdirSync(controllerPath);
  if (options.verbose) {
    console.log(
      `${consoleKey}: startup --- Directory names retrieved from the controllers module:\n\n  ${directoryRead}\n`
    );
    console.log(
      `${consoleKey}: startup --- Begin looking in each directory to see if it contains a start up script...`
    );
  }
  // For each one of the controllers, search for the startup script and run it
  directoryRead.forEach((directory: string) => {
    console.log(
      `${consoleKey}: startup --- Calling the searchDirectoryForStartup function with directory:\n\n  ${directory}\n`
    );
    searchDirectoryForStartup(directory, options);
  });
  return 'Biscuits and Gravy';
};

export default startup;
