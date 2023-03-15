import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  render() {
    const { result, artist } = this.props;
    return (
      <div data-testid="page-album">
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            { artist }
          </h2>
          <div>
            {
              result.length
                ? result.map((card) => (
                  <Link
                    style={ { display: 'block' } }
                    to={ `/album/${card.collectionId}` }
                    key={ card.artistId }
                    data-testid={ `link-to-album-${card.collectionId}` }
                  >
                    {card.collectionName}
                  </Link>
                ))
                : <p>Nenhum álbum foi encontrado</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  result: PropTypes.shape.isRequired,
  artist: PropTypes.string.isRequired,
};

export default Album;
