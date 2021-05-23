import React from "react"

const AllBookButton = (props) => {

    return (
        <div className="btn-part">
            <button name="add-new-book" onClick={props.data.handleClick} className="btn add-book-btn">+</button>

            <button name="delete-all" onClick={props.data.handleClick} className="btn del-book-btn">!</button>
        </div>
    )
}

export default AllBookButton