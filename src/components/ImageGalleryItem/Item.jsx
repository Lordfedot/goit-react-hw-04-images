import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {toggleModal} = this
    const { showModal } = this.state;
    const { smallImg, tag, largeImg,id } = this.props;
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
}

ImageGalleryItem.propTypes ={
  onClose: PropTypes.func,
}
