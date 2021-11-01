# UI for the City of Helsinki Ahti project

**Note! Ahti project has ended and is no longer being actively developed.**

## About

### What?

Ahti, named after the epic Finnish sea god, brings together all of the services
and destinations connected with the Helsinki archipelago. Developed jointly with boating companies,
boat clubs and others, Ahti will become a one-stop shop for all things maritime: including
info on islands, shores, beaches, sea routes, coffee shops, boat rental and repair shops, paddleboards
and relaxing saunas. Everything you need to know about the Helsinki archipelago in the palm of your hand!

### Who?

For everyone who is interested in exploring the islands and sea areas of the Gulf of Finland, whether boaters,
fishers, swimmers or landlubbers. The open database also allows boat owners to rent out berth places to other
boaters, among other things.

### Why?

To concentrate maritime information on one single platform, making it easier for residents and visitors to get
to know and enjoy the Helsinki archipelago.

### When?

The first official release of Ahti is prepared for 16.6.2020 and continuous development is expected to continue after release.

## See also

The backend source repository:
https://github.com/City-of-Helsinki/ahti

## Development

### Getting started

- Clone the repo.
- Create `.env.development.local` from `.env.development` if you need to modify some environment variable. For more, check [this](https://create-react-app.dev/docs/adding-custom-environment-variables#docsNav)
- Run `yarn` to install dependencies.
- Run `yarn start` to start a local development environment at [http://localhost:3000](http://localhost:3000).

For an isolated development environment, you can use our the following docker commands:

`docker-compose up` to start the dockerized dev-environment.<br>
`docker-compose down` stops the container.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn generate`

Generate static types for GraphQL queries by using the schema from the backend server.
