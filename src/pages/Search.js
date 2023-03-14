import React from 'react';
import Header from '../components/Header';
import api from '../services/searchAlbumsAPI';
import Album from '../components/Album';

let timing;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      bandValue: '',
      buttonDisable: true,
      loading: false,
      data: null,
      saveName: '',
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

  handleButton = async () => {
    clearTimeout(timing);
    const { bandValue } = this.state;
    const number = 600;
    this.setState({
      loading: true,
      saveName: bandValue,
      bandValue: '',
      buttonDisable: true,
    });
    timing = setTimeout(async () => {
      clearTimeout(timing);
      const result = await api(bandValue);
      this.setState({
        loading: false,
        data: result,
      });
      this.setState({ loading: false });
    }, number);
  };

  render() {
    const { bandValue, buttonDisable, loading, data, saveName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          !loading ? (
            <>
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
            </>
          ) : <p>Carregando...</p>
        }
        {
          data !== null && <Album artist={ saveName } result={ data } />
        }
      </div>
    );
  }
}

export default Search;
