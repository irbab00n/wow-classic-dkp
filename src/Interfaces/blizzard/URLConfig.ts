/**
 * @interface URLConfig
 * @description
 * Allows the API URL to be configured in a separate file while having an explicit interface type placed over the top of it
 * @type <object>
 * @key <string>
 * @field protocol <string>: Specifies what the transfer protocol is
 * @field region <string>: Specifies what world region the API needs to pull from
 * @field domain <string>: The base API domain name; e.g. api.blizzard.com
 * @field namespace <string>: Allows for the api to know whether the developer is attempting to use Classic WoW data, or Retail WoW data
 * @field locale <string>: Specifies what language format the text will come back from the API
 * @returns <string>
 */
export interface URLConfig {
  [key: string]: string;
  protocol: string;
  region: string;
  domain: string;
  namespace: string;
  locale: string;
}
