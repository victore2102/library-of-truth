import React, { useState } from 'react';

export default function View({book}) {

    const [bookFetch, setBookFetch] = useState("");

    const setBookName = () => {
        fetch("http://localhost:9000/books/2").then(res => res.text()).then(res => setBookFetch(res));
    }


    return(
        <div>
            <h1>{book.name}</h1>
            <img style={{width: '400px', height: '360px'}} src={book.image} />
            <button onClick={setBookName}>Click Me Test!</button>
            <h2>Book #2 from MongoDB - {bookFetch}</h2>
        </div>
    );
}