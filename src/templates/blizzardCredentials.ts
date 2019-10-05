import { BlizzardAuthCredentials } from '../interfaces/blizzard/AuthCredentials';

const blizzard_credentials: BlizzardAuthCredentials = {
  client: {
    id: process.env.BLIZZARD_CLIENT_ID,
    secret: process.env.BLIZZARD_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://us.battle.net',
  },
};

export default blizzard_credentials;
