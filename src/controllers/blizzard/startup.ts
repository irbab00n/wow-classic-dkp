import { getToken } from './getToken';
import { getItemClassesIndex, getItem } from './items';
import { getPlayableClassesIndex } from './classes';

getToken().then(() => {
  getItemClassesIndex({ verbose: true });
  getItem(19019, { verbose: true });
  getPlayableClassesIndex();
});
