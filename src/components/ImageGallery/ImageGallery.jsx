import { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorRing } from 'react-loader-spinner';
import { ImageGalleryItem } from 'components/ImageGalleryItem/Item';
import { fetchImages } from 'components/Api';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    total: 0,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.name !== this.props.name ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.name !== this.props.name) {
        this.setState({ images: [], page: 1 });
      }
      this.setState({ status: 'pending' });

      const data = await fetchImages(this.props.name, this.state.page);
      const images = data.hits;

      this.setState(prevState => ({
        status: 'resolved',
        images: [...prevState.images, ...images],
        total: data.totalHits,
      }));

      if (images.length === 0) {
        this.setState({ status: 'rejected' });
      }
    }
  }
  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images, total } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'rejected') {
      return <h1>Sorry, there are no images with this name</h1>;
    }
    if (status === 'resolved' || status === 'pending') {
      return (
        <div className='container'>
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
            images.length < total && (
              <Button handleButtonClick={this.incrementPage} />
            )}
        </div>
      );
    }
  }
}


ImageGallery.propTypes ={
  key: PropTypes.string,
  smallImg: PropTypes.string,
  largeImageURL: PropTypes.string,
  tag: PropTypes.string,
  handleButtonClick: PropTypes.func,
}
