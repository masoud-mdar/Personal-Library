import React from "react"

const AllBooksList = (props) => {
    
    return (
        <div className="all-books-list">
            <ul>
                {
                    props.data.allBooksList.map(book => {
                        return (
                            <li key={Math.random() * Math.random()}>
                                <button name="book-select" id={book._id} onClick={props.data.handleClick} className="btn book-select-btn">{book.title}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default AllBooksList