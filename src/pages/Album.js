import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      music: null,
      album: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const [album, ...music] = await getMusics(id);
    this.setState({ album, music });
  }

  render() {
    const { music, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { album && (
          <div>
            <h1 data-testid="artist-name">{ album.artistName }</h1>
            <h2 data-testid="album-name">{ album.collectionName }</h2>
          </div>
        )}
        <ul>
          {
            music && music.map((element) => (
              <MusicCard
                key={ element.artistId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  ...Route.propTypes,
};

export default Album;
