# Helsinki City Ahti project

## last updated 22-07-2019

![Helsinki City Ahti project](Mockup-1.png)

## General information

https://drive.google.com/open?id=1Rghr1WjKDJs0Vmbkmp1yLyF6IxmX5lGn

### Scope of the project

For now scope of the project includes:

- map with markers of places
- list of places of interest by type and category
- views and UIs that comply with Helsinki City brand guidelines
- localization
- Test experience views

Not in scope:

- accesibility
- server side rendering
- visual and programmatic testing
- UX reserach and multiple use cases

## Design sources

Are in Figma https://www.figma.com/file/ZKAH36THbAPVs9gNdmH8N6Dh/Ahti?node-id=0%3A1

## Map

The map we use is Mapbox:

- minimal style: `mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf` by Olli Kilpi

## Data

In order to create data we use [geojson.io](geojson.io)

http://geojson.io/#map=12/60.1367/24.9237

The file is in /src/mapData.geojson that is remporarily changed to `.json` for import reasons

We filter data by data types and tags. So far the types that we have are:

- 'beach'
- 'restaurant'
- 'island'
- 'cafe'
- 'church'

We can add locations manually to mapData.json file
The script to check file is at ./src/scripts/mapDataManager.js
also runs on commit as a hook.

### TODO

Add these locations:

Beaches
https://theculturetrip.com/europe/finland/articles/7-beaches-you-need-to-visit-in-helsinki/
https://www.hel.fi/helsinki/en/culture/sports/outdoor/outdoor-swimming/
https://www.hel.fi/helsinki/en/culture/sports/outdoor/outdoor-swimming/nudist-beaches
https://ulkoliikunta.fi/
https://www.hel.fi/helsinki/en/culture/sports/outdoor/outdoor-swimming/quality

## Technical details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts (we use yarn instead of npm)

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject` WE DID NOT DO IT YET AND NOT REALLY SURE IF WE NEED TO

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Deployment

We deploy using Netlify. The repository is already linked to Netlify instance.
Some rules:

1. Include variables from .env file into deploy rules
2. Make sure you deploy from master branch
3. Make sure you deploy from `build` folder
4. Make sure your `yarn build` script in package.json is like this: "build": "react-scripts build && echo '/\* /index.html 200' | cat >build/\_redirects" if you are ranning a non-SSRed version of create-react-app (the one we have now) otherwise things will crushhhhhhhhhh
5. We also now have a netlify redirect file that is supposed to eliminate the need for that build script (has to be tested)

To setup deploy from CLI, do:
`npm install netlify-cli -g netlify deploy`

TODO:

1. Analytics for user interactions (Netlify Analytics) and maube crush reports (Bugsnag/Cypres)
2. Testing on devices:
   2.1. Browserstack
   2.2. Make sure we show mobile size on desktop screens
   2.3. Make sure to lock orientation to portrait
3. DNS config (preview.ahti.helsinki.fi ?????)
4. Make sure routes work
5. Constraints:
   1. Only mobile browsers
6. Location recognition (????????????????????)

IS SUPPOSED TO CHANGE!!!!!!!!!!!!!!!!!!!!
Image assets:

1. `assets/images`
2. https://imageoptim.com/mac
3. https://www.npmjs.com/package/image-to-gradient
   https://www.google.com/search?ei=V3YwXYK4MZXSmwXb0oqQDA&q=image+to+gradient+npm&oq=image+to+gradient+npm&gs_l=psy-ab.3...5640.11710..12096...1.0..0.190.1645.20j2......0....1..gws-wiz.......0i71j35i39j0i67j0j0i20i263j0i22i30j33i22i29i30.8IOPIg05ZHI&ved=0ahUKEwjCv5XOy77jAhUV6aYKHVupAsIQ4dUDCAo&uact=5
4. Naming should have IDs:

   ```
    {
    Name: “suomenlinna”,
    imageID: “1223’

    }
   ```

```

`/assets/images/1223.png`

https://www.npmjs.com/package/react-lazy-images
```

## Google Analytics

We use Google Analytics to track user interactions and navigations.
Because this is an SPA, we cannot rely simply on server logs and page refresh; we have to account for the in-client navigation as well!

### The setup

We have a Google Analytics team, "Ahti Helsinki".

Under that, we have two properties:

- "Ahti Helsinki Live": Meant to track the production URL. Currently not active, pending DNS changes.
- "Ahti Helsinki MVP": Meant to track development and (maybe in the future) UAT versions. Temporarily the "live" one, pending the DNS changes above.

### The script

We use the standard Google Analytics [analytics.js script tag](https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tracking_snippet) to load the initial version of the library.

We do this in `<head>`, because it is the most direct, and does not have to wait for the whole JS bundle to download, to register the first pageView.

The tracking id is inlined in the html as `REACT_APP_ANALYTICS_ID`. This is done through Create React App, and its default functionality.

### In React

After setting up the initial script and pageView, we must hook into the Route transitions on the client.

We do this with a higher-order-component, that wraps any page component.
This sends a `pageView` event with the location path and search, whenever the location updates. The basis for this is [react-ga](https://www.npmjs.com/package/react-ga).

In the future, if we want to track other user interactions (e.g. "User clicked add place button"), we can use [ReactGA.event](https://github.com/react-ga/react-ga#reactgaeventargs).
