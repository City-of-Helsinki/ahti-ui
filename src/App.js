import React from 'react';
import MapPage from './Components/MapPage/MapPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import { withTranslation } from 'react-i18next';
import Menu from './Components/Menu/Menu';
import BaseButton from './Components/BaseButton/BaseButton';

import styled, { ThemeProvider } from 'styled-components';

export const GlobalGeoContext = React.createContext();

const theme = {
  secondaryColor: 'white',
  primaryColor: 'red',
  borderColor: '#ccc',
  fonts: {
    fontFamilyRegular: 'Helsinki Grotesk Regular',
    fontFamilyBold: 'Helsinki Grotesk Bold',
  },
  colors: {
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#001A33',
    pink: '#FADCE8',
    lightGray: '#c2c2c2',
  },
  borders: {
    buttonBorder: '2px solid #001A33',
  },
  shadows: {
    menuShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  gradients: {
    blockGradient:
      'linear-gradient(360deg, #DEE7ED 0%, rgba(255, 255, 255, 0) 99.98%, rgba(255, 255, 255, 0) 100%);',
    verticalBlockGradient:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.55%);',
  },
};

const LanguageButton = styled(BaseButton)`
  /* Make the buttons stack next to each other.
   * Might change if we make their parent a flexbox, in the future.
  */
  display: inline-block;

  padding: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;

  /* Space the buttons on the horizontal */
  &:last-of-type {
    margin-left: 0.5rem;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointData: [],
    };
  }

  componentDidMount() {
    import('./mapData.json').then(data => {
      this.setState({
        pointData: data.default.features,
      });
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalGeoContext.Provider value={this.state.pointData}>
          <Router>
            <Menu>
              <h1 className="mainTitle">
                <Link to="/">Ahti</Link>
              </h1>
              <div>
                <LanguageButton onClick={() => i18n.changeLanguage('en')}>
                  en
                </LanguageButton>
                <LanguageButton onClick={() => i18n.changeLanguage('fi')}>
                  fi
                </LanguageButton>
              </div>
            </Menu>

            <Route exact path="/" component={() => <Home />} />
            <Route path="/map" component={() => <MapPage />} />
          </Router>
        </GlobalGeoContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withTranslation()(App);
