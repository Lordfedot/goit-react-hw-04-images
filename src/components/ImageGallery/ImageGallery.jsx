import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/Item';

import { Button } from 'components/Button/Button';

export const ImageGallery = ({ incrementPage, status, images, total }) => {
  if (status === 'idle') {
    return;
  }

  if (status === 'rejected') {
    return <h1>Sorry, there are no images with this name</h1>;
  }
  if (status === 'resolved' || status === 'pending') {
    return (
      <div className="container">
        <ul className="imageGallery">
          {images.map(({ webformatURL, largeImageURL, tags, id }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                tag={tags}
              />
            );
          })}
        </ul>

        {status === 'pending' && <ColorRing />}
        {status !== 'pending' &&
          images.length > 11 &&
          images.length < total && <Button handleButtonClick={incrementPage} />}
      </div>
    );
  }
};

ImageGallery.propTypes = {
  key: PropTypes.string,
  smallImg: PropTypes.string,
  largeImageURL: PropTypes.string,
  tag: PropTypes.string,
  handleButtonClick: PropTypes.func,
};
