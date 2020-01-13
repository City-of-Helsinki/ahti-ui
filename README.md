# City of Helsinki Ahti project 
## available at https://ahti.app/

## This repository contains the first Proof of Concept implementation by Futurice
## Documentation last updated 13-01-2020

## General information

https://drive.google.com/open?id=1Rghr1WjKDJs0Vmbkmp1yLyF6IxmX5lGn

## Design sources
Are in Figma https://www.figma.com/file/ZKAH36THbAPVs9gNdmH8N6Dh/Ahti?node-id=0%3A1

## Map
The map we use is Mapbox:
- minimal style: `mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf` designed by Olli Kilpi

## Learn More
The app has been bootstrapped from Create React App.  [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## The setup
We have a Google Analytics team, "Ahti Helsinki".

Under that, we have two properties:

- "Ahti Helsinki Live": Meant to track the production URL. Currently not active, pending DNS changes.
- "Ahti Helsinki MVP": Meant to track development and (maybe in the future) UAT versions. Temporarily the "live" one, pending the DNS changes above.

## Requirements

<!-- TODO: document these -->

## Usage

### Configuring environment variables

This application reads environment variables from the dotfile `.env`. All configurable variables, their purpose and possible values can be found in the example file `.env.example`. To get started copy the example file and edit any variables specified as required:
   ```
   $ cp .env.example .env
   ```

### Docker

1. Check that Docker and Docker CLI are installed and that port `3000` is free and not occupied by a running server.

2. Make sure you have env variables in `.env` as discussed in the previous section.

3. Start building docker image and start container:
   ```
   $ docker-compose up
   ```
4. Open `localhost:3000` on browser when Webpack bundling is ready.

#### Useful Docker commands

- To rebuild the docker images:
  ```
  $ docker-compose up --force-recreate --build
  ```
- To enter inside docker container environment:
  ```
  $ docker-compose exec app sh
  ```
- Remove docker container if needed:
  ```
  $ docker rm -f ahti-ui
  ```
- Remove docker image:
  ```
  $ docker rmi ahti-ui_app
  ```
- Running command inside Docker environment (test for example):
  (Make sure docker container is running)
  `$ docker-compose run app YOUR_COMMAND_HERE`
- Encountering issues with `node-sass`? Try to go inside docker container environment and run `npm rebuild node-sass`.

### Running the application locally

1. Install dependencies:

```
yarn install
```

2. Ensure environment variables are set.

3. Start the development server:

```
yarn start
```

### Running tests

<!-- TODO: document this -->

### Linting

<!-- TODO: document this -->


### Scope of the project

For now scope of the project includes:

- map with markers of places
- list of places of interest by type and category
- views and UIs that comply with Helsinki City brand guidelines
- localization
- Test experience views
- accesibility
- server side rendering
- visual and programmatic testing
- UX reserach and multiple use cases

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 City of Helsinki <[http://www.hel.fi/](http://www.hel.fi/)>