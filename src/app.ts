import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import startup from './startup';
import routes from './routes';

const consoleKey = '~*~ APP ---';

console.log(`${consoleKey} Creating and initializing app...`);

const app: { [key: string]: any } = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log(`${consoleKey} Intializing all application routes...`);
routes.forEach((route: any) => {
  console.log(
    `${consoleKey} Intializing endpoint: ${route.verb.toUpperCase()} @ ${
      route.endpoint
    }`
  );
  app[route.verb](route.endpoint, route.controller);
});

console.log(`${consoleKey} Running application startup script...`);
startup({ verbose: true });

export default app;
