import React from "react"

const AllBookButton = (props) => {

    return (
        <div className="btn-part">
            <span className="add-part">
                <div>
                    <p className="add-del-hover-p">Add a New Book</p>
                </div>
                <button name="add-new-book" onClick={props.data.handleClick} className="btn add-book-btn">+</button>
            </span>
            
            <span className="del-part">
                <div>
                    <p className="add-del-hover-p">Delete All Books</p>
                </div>
                <button name="delete-all" onClick={props.data.handleClick} className="btn del-book-btn">!</button>
            </span>
            
        </div>
    )
}

export default AllBookButton