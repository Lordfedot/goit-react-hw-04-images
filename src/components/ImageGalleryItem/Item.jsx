import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({id,smallImg,largeImg,tag}) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(prevState => !prevState)
  }

  return (
    <li className="imageGalleryItem" key={id}>
      <img
        onClick={toggleModal}
        className="imageGalleryItem-image"
        src={smallImg}
        alt={tag}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt={tag} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes ={
  onClose: PropTypes.func,
}
