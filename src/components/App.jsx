import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'components/Api';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!name) {
      return;
    }
    setStatus('pending');
    async function fetchData() {
      const data = await fetchImages(name, page);
      const images = data.hits;
      const totalImages = data.totalHits;

      setImages(prevState => [...prevState, ...images]);
      setTotal(totalImages);
      setStatus('resolved');

      if (images.length === 0) {
        setStatus('rejected');
      }
    }
    fetchData();
  }, [name, page]);

  const handleFormSubmit = inputValue => {
    setName(inputValue);
    setPage(1);
    if (inputValue !== name) {
      setImages([]);
    }
  };

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        images={images}
        total={total}
        incrementPage={incrementPage}
      />
    </>
  );
};

App.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
};
