import React from 'react';
import './searchForm.css';

class SearchForm extends React.Component {
  render() {
    return (
      <form className="search-form"  action="GET" onSubmit={this.props.onSumb}>
        <input placeholder="Search" className="search-form__input" id="search-input" type="text"/>
        <button className="button search-form__button" type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;