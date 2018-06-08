import React from 'react';
import './book.css';

class Book extends React.Component {
  constructor() {
    super();
  }

  render() {

    let bookInfo = this.props.book.volumeInfo;
    let bookId = this.props.book.id;
    return (
      <article className="book">
        <h3>{bookInfo.title}</h3>
        <Subtitle subtitle={bookInfo.subtitle}/>
        <Authors authors={bookInfo.authors}/><br/>
        <PubDate publishedDate={bookInfo.publishedDate}/><br/>
        <div className="book__inner-wrapper">
          <Image src={bookInfo.imageLinks}/>
          <Description description={bookInfo.description}/>
        </div>
        <button onClick={this.props.onClk} data-book-id={bookId} className="button book__button">Add</button>
      </article>
    );
  }
}


let Subtitle = (props) => {
  return (
    props.subtitle ? (
      <h4 className="book__subtitle">{props.subtitle}</h4>
    ) : null
  );
};

let PubDate = (props) => {
  let date = props.publishedDate;
  if (date) {
    if (date.search(/^[0-9]{4}$/) === 0) {
      return <span className="book__date small italic">{date}</span>
    } else if(date.search(/^[0-9]{4}-[0-9]{2}$/) === 0) {
      let dt = new Date(date);
      let options = {month: 'short', year: 'numeric'};
      dt = dt.toLocaleDateString('en-GB', options)
      return <span className="book__date small italic">{dt}</span>
    } else {
      let dt = new Date(date);
      let options = {day: 'numeric', month: 'short', year: 'numeric'};
      dt = dt.toLocaleDateString('en-GB', options)
      return <span className="book__date small italic">{dt}</span>
    }
  } else {
    return null;
  }
}

let Image = (props) => {
  return (
    props.src ? (
      <img className="book__img" src={props.src.smallThumbnail} alt=""/>
    ) : null
  )
}

let Description = (props) => {
  let description = props.description;
  if (description) {
    if (description.length > 200) {
      description = description.slice(0, 200) + '...';
    }
    return (
      <p className="book__description">{description}</p>
    )
  } else {
    return null;
  }
};

let Authors = (props) => {
  if (props.authors) {
    return (
      <span className="book__authors small italic">{props.authors.join(', ')}</span>
    )
  } else {
    return null;
  }
}

export default Book;
