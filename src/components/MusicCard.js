import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleButton = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, checked: true });
    await addSong({ });
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;

    return (
      <div>
        {
          !loading ? (
            <>
              <li>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                </audio>
              </li>
              <label
                data-testid={ `checkbox-music-${trackId}` }
              >
                Favorita
                <input
                  type="checkbox"
                  onClickCapture={ this.handleButton }
                  checked={ checked }
                />
              </label>
            </>
          ) : <p>Carregando...</p>
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
