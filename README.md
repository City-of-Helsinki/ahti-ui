# City of Helsinki Ahti project

## available at https://ahti.app/

## Documentation last updated 04-02-2020

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

For available scripts, refer to the create-react-app documentation.

## Available Scripts

In the project directory, you can run:

`yarn start`
`yarn test`
`yarn build`
`yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Code quality assurance

Is enforced by `.eslint` and `.prettier` configuration files for TypeScript files as per the recommended configuration marked by checkboxes:

https://eslint.org/docs/rules/

We are using `.stylelintrc.json` with scss.

You are supposed to have VScode extensions such as ESlInt and Prettier and Stylelint installed, the same rules are now enforced by git hooks.

## Design && UI components

UI components are created inside of the

`src/common/ui-components`

and follow the Atomic Design Principles
https://bradfrost.com/blog/post/atomic-web-design/

This application should follow the core of Helsinki Design System
https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/core

, independant from react components.

_NB:_ Currently we are not using the HDS yet due to HDS not being ready, we will add it #sooon.
