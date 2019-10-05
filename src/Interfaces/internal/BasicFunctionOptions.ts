/**
 * @interface BasicFunctionOptions
 * @description
 * A baseline format for how functions should always receive a set of user config settings that allow the function to run in different ways
 * @type <object>
 * @key <string>
 * @field verbose <boolean>: Determines whether or not a function should print out a more verbose readout of what's happening at any given time.
 * @returns <boolean>
 */
export interface BasicFunctionOptions {
  [key: string]: boolean;
  verbose?: boolean;
}
