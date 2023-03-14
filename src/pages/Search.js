import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      bandValue: '',
      buttonDisable: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value, checked, type } = target;
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    }, this.verify);
  };

  verify = () => {
    const { bandValue } = this.state;
    const number = 2;
    const isInput = (input) => input.length >= number;
    this.setState({
      buttonDisable: !isInput(bandValue),
    });
  };

  // handleButton = async (e) => {
  //   e.preventDefault();
  //   const { bandValue } = this.state;
  //   this.setState({ buttonClicked: true });
  //   this.setState({ buttonClicked: false });
  // };

  render() {
    const { bandValue, buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          name="bandValue"
          value={ bandValue }
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ buttonDisable }
          onClick={ this.handleButton }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
