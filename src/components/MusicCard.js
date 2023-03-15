import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { trackName } = this.props;
    this.setState({ loading: true });
    const localApi = await getFavoriteSongs();
    this.setState({
      checked: localApi.some((song) => song.trackName === trackName),
      loading: false,
    });
  }

  handleButton = async () => {
    const { checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({ loading: true, checked: true });
    if (!checked) {
      await addSong({ trackName, previewUrl, trackId });
    } else {
      await removeSong({ trackName, previewUrl, trackId });
      this.setState({ checked: false });
    }
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
                  onClick={ this.handleButton }
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
