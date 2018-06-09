import React from 'react';
import SearchForm from './searchForm/searchForm';
import Book from './book/book';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      myBooks: []
    }
  }

  search(e) {
    e.preventDefault();
    let inputValue = e.target.children[0].value;
    this.sendRequest(inputValue);
  }

  sendRequest(inputValue) {
    let _this = this;
    let url = 'https://www.googleapis.com/books/v1/volumes?maxResults=15&q=' + inputValue;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        _this.setState({
          books: JSON.parse(xhr.responseText).items
        });
      }
    };

    xhr.send();
  }

  addBook(e) {
    for (let i = 0; i < this.state.books.length; i++) {
      if(this.state.books[i].id === e.target.dataset.bookId) {
        for (let j = 0; j < this.state.myBooks.length; j++) {
          if(this.state.myBooks[j].id === e.target.dataset.bookId) {
            return;
          }
        }
        this.setState({
          myBooks: [...this.state.myBooks, this.state.books[i]]
        });
      }
    }
  }

  removeBook(e) {
    this.setState({
      myBooks: this.state.myBooks.filter((book) => !(book.id === e.target.dataset.bookId))
    });
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="main-wrapper clearfix">
            <SearchForm onSumb={this.search.bind(this)}/>
          </div>
        </header>
        <div className="main-wrapper">
          <ul className="books-list">
            {this.state.books.map((book) => {
              return (
                <li className="books-list__item">
                  <Book book={book} onClk={this.addBook.bind(this)}
                        button="Add"/>
                </li>
              )
            })}
          </ul>
          <ul className="books-list">
            {
              this.state.myBooks.map((book) => {
                return (
                  <li key={book.id} className="books-list__item">
                    <Book book={book} onClk={this.removeBook.bind(this)}
                          button="Remove"/>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    );
  }

}


export default App;
