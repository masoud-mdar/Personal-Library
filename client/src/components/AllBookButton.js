import React from "react"

const AllBookButton = (props) => {

    return (
        <div className="btn-part">
            <div className="add-book">
                {/*<button name="all-books" onClick={handleClick} className="btn">Show me all</button>*/}
                <button name="add-new-book" onClick={props.data.handleClick} className="btn add-book-btn">+</button>
            </div>

            <div className="delete-all">
                <button name="delete-all" onClick={props.data.handleClick} className="btn del-book-btn">!</button>
            </div>
        </div>
    )
}

export default AllBookButton