/*

Shape of the Route object:

{
  verb: String
  endpoint: String
  middleware: TBD
  controller: function
}

*/
// for each collection of route objects, concat them together and export them
import blizzard from './blizzard';

const fullRoutes = [blizzard].reduce(
  (collected, routes) => collected.concat(routes),
  []
);

export default fullRoutes;
