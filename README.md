
# City of Helsinki Ahti project

# This repository contains the first Proof of Concept implementation by Futurice

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

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 City of Helsinki <[http://www.hel.fi/](http://www.hel.fi/)>
