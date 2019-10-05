import { getToken } from './getToken';
import { getItemClassesIndex } from './items';
import { getPlayableClassesIndex } from './classes';

getToken().then(() => {
  getItemClassesIndex();
  getPlayableClassesIndex();
});
