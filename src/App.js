import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginValue: '',
      buttonDisable: true,
    };
  }

  handleButton = () => {
    const { loginValue } = this.state;
    const number = 3;
    const isInput = (input) => input.length >= number;
    if (isInput(loginValue)) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name, value, checked, type } = target;
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.handleButton);
  };

  render() {
    const { loginValue, buttonDisable } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Login
              onInputChange={ this.onInputChange }
              loginValue={ loginValue }
              buttonDisable={ buttonDisable }
              createUser={ this.createUser }
            />
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
