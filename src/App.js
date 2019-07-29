import React from 'react';
import MapPage from './Components/MapPage/MapPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import { withTranslation } from 'react-i18next';
import BaseButton from './Components/BaseButton/BaseButton';
import DropDown from './Components/DropDown/DropDown';
import mapData from './mapData.json';
import lineData from './lineData.json';
import styled, { ThemeProvider } from 'styled-components';
import withTracker from './withTracker';
import { ReactComponent as AhtiLogo } from './assets/icons/ahti_logo.svg';
import { ReactComponent as MenuLogo } from './assets/icons/menu.svg';

export const GlobalGeoContext = React.createContext();
export const GlobalLineContext = React.createContext();

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
    lightGray: '#E9EFF3',
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

const TitleContainer = styled.div`
  z-index: 2000;
  position: absolute;
  top: 1rem;
  left: 1rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 30% / 50%;
  padding: 1.5rem;
`;

const MenuButton = styled(BaseButton)`
  z-index: 2000;
  position: absolute;
  top: 1rem;
  right: 2rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }
  render() {
    const { i18n } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <GlobalGeoContext.Provider value={mapData.features}>
          <GlobalLineContext.Provider value={lineData.data}>
            <Router>
              {this.state.menuOpen && (
                <DropDown
                  onExit={() => {
                    document.body.style.overflowY = 'scroll';
                    this.setState({ menuOpen: false });
                  }}
                  onLanguageFI={() => i18n.changeLanguage('fi')}
                  onLanguageEN={() => i18n.changeLanguage('en')}
                />
              )}
              <Link to="/">
                <TitleContainer>
                  <AhtiLogo />
                </TitleContainer>
              </Link>
              <MenuButton
                onClick={() => {
                  document.body.style.overflowY = 'hidden';
                  this.setState({ menuOpen: true });
                }}
              >
                <MenuLogo />
              </MenuButton>

              {/* NOTE: Make sure to wrap any other Route components withTracker.
               * An alternative might be to set up a top-level route and only wrap that.
               */}
              <Route exact path="/" component={withTracker(Home)} />
              <Route path="/map" component={withTracker(MapPage)} />
            </Router>
          </GlobalLineContext.Provider>
        </GlobalGeoContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withTranslation()(App);
