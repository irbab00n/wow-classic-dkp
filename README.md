# WoW Classic DKP API

This is a Node API designated to pulling Classic Game Data from the World of Warcraft API.
<br>
<br>

## Technology

- TypeScript : Strict typing for JavaScript
- Express : Flexible API endpoint framework for Node
- Nodemon\* : Live code updating for Node processes
- Prettier\* : On-save code style and formatting enforcement
- Husky* : Git pre-commit hook integration to allow Prettier to enforce code style and format before a developer can commit code
  <br>
  <br>
  *development only

    <br>

## Installation

To install the application, you must first have Node installed on your computer.

Please visit [this](https://nodejs.org/en/download/) link if you would like to read how to install Node
<br>
<br>

With Node installed, run the following command in your terminal

```
npm install
```

<br>
<br>

## Starting the Server

There are two available ways to start the application.
<br>
<br>

### Development

To run the application in Development mode, run the following command in your terminal

```
npm run start:dev
```

This will run a script from the package.json that will run a daemon called Nodemon that provides live code updates as changes are saved within the code.

<br>
<br>

### Production

To run the application in Production mode, it's important to understand what will be happening during that process.

Since the application is written in TypeScript, the code will have to be compiled into JavaScript before it is able to be executed. After the build has completed successfully, a 'build' directory will be created with the compiled files.

After being built, a second instruction tells Node to start a process using our newly created build directory; defaulting it to look for the 'index.js' file inside the root of the directory.

To start the Production build and run process, run the following command in your terminal

```
npm start
```

NOTE: This is your deployment start up script. When you deploy the application into whichever service is most appropriate for your needs, you will need to tailor the start up script to include this command.
