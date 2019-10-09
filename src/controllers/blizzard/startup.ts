import fs from 'fs';
import { getToken } from './getToken';
import { getItemClass, getItem } from './items';
import { getCreatureFamiliesIndex } from './creatures';
// import itemClasses from '../../lib/item-classes.json';
import creatureFamiliesWithMedia from '../../lib/creature-families-with-media.json';
import Axios from 'axios';
import path from 'path';

// const parsedItemClasses = JSON.parse(JSON.stringify(itemClasses));
const locale = 'en_US';

// getCreatureFamiliesMediaFull
// try {
//   getToken().then(async (accessToken: string) => {
//     let { creature_families } = await getCreatureFamiliesIndex({ verbose: true });

//     let mappedCreatureFamilies = creature_families.map((creatureFamily: any) => {
//       return new Promise((resolve, reject) => {
//         return Axios.get(`${creatureFamily.key.href}&locale=${locale}&access_token=${accessToken}`).then((result: any) => {
//           let mappedResult = Object.assign(creatureFamily, result.data);
//           if (mappedResult.hasOwnProperty('key')) delete mappedResult.key;
//           resolve(mappedResult);
//         });
//       });
//     });

//     let fullMappedCreatureFamilies = await Promise.all(mappedCreatureFamilies);

//     let mappedCreatureFamiliesWithMedia = fullMappedCreatureFamilies.map((creatureFamily: any) => {
//       if (creatureFamily.hasOwnProperty('media')) {
//         let { href } = creatureFamily.media.key;
//         console.log('creatureFamilyWithMedia href: ', href);
//         return new Promise((resolve, reject) => {
//           return Axios.get(`${href}&locale=${locale}&access_token=${accessToken}`).then((result: any) => {
//             let newCreatureFamilyWithMedia = Object.assign({}, creatureFamily); // create a copy of the creature family
//             newCreatureFamilyWithMedia.media = Object.assign(newCreatureFamilyWithMedia.media, result.data); // then extend the media object
//             // if (mappedResult.hasOwnProperty('key')) delete mappedResult.key;
//             resolve(newCreatureFamilyWithMedia);
//           }).catch((error: any) => {
//             reject(error);
//           });
//         });
//       } else {
//         return creatureFamily;
//       }
//     });

//     let combinedMediaResults = await Promise.all(mappedCreatureFamiliesWithMedia);

//     console.log('\n\n\n', 'Logging the final results: ', combinedMediaResults);
//     fs.writeFileSync(path.resolve(__dirname, '../../lib/creature-families-with-media.json'), JSON.stringify(combinedMediaResults));
//     console.log('combined results: ', combinedMediaResults);
//   });
// } catch (error) {
//   console.log('something went wrong:\n\n\n', error);
// }

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
//   fs.writeFileSync(path.resolve(__dirname, '../../lib/item-classes-subclasses.json'), JSON.stringify(combinedResults));
//   return combinedResults;
// });
// // };
