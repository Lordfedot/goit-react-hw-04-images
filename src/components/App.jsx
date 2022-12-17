import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
export class App extends Component {
  state = {
    name: '',
  };
  handleFormSubmit = name => {
    
    this.setState({ name });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery name={this.state.name} />
      </>
    );
  }
}

App.propTypes ={
  onSubmit: PropTypes.func,
  name: PropTypes.string,
}
