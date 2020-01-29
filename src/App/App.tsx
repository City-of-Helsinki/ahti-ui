import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApplicationHeader from '../common/ui-components/Header/Header';
import { HomeWrapper } from '../common/pages/Home/Home';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <ApplicationHeader />
        </header>
        <Route exact path="/" component={HomeWrapper} />
      </div>
    </Router>
  );
};

export default App;
