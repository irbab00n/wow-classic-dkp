import fs from 'fs';
import { getToken } from './getToken';
import { getItemClass, getItem } from './items';
import itemClasses from '../../lib/item-classes.json';
import Axios from 'axios';
import path from 'path';

const parsedItemClasses = JSON.parse(JSON.stringify(itemClasses));
const locale = 'en_US';

// Get item classes
// // const retrieveItemSubClassesForClasses = () => {
// getToken().then(async (accessToken: string) => {
//   // console.log('parsedItemClasses: ', parsedItemClasses, '\n');
//   let mappedClasses = parsedItemClasses.map((itemClass: any) => {
//     return new Promise((resolve, reject) => {
//       return Axios.get(`${itemClass.key.href}&locale=${locale}&access_token=${accessToken}`).then((results: any) => {
//         // console.log('results of getting the item class: ', results);
//         let mappedResult = Object.assign(itemClass, results.data);
//         if (mappedResult.hasOwnProperty('key')) delete mappedResult.key;
//         resolve(mappedResult);
//       })
//     });
//   });
//   let combinedResults = await Promise.all(mappedClasses)
//   // fs.writeFileSync(path.resolve(__dirname, '../../lib/item-classes-subclasses.json'), JSON.stringify(combinedResults));
//   return combinedResults;
// });
// // };
