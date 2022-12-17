import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    name: '',
  };
  handleNameChange = e => {
    this.setState({ name: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name === '') {
        return
    }
    
    this.props.onSubmit(this.state.name)
    this.setState({name: ''})
  };
  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
