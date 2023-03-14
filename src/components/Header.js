import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({ user: data });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {user === '' ? (
          <p>Carregando...</p>
        ) : (
          <span data-testid="header-user-name">{ user.name }</span>
        )}
        <div>
          <p>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </p>
          <p>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </p>
          <p>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
