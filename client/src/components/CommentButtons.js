import React from "react"

const CommentButtons = (props) => {

    return (
        <div className="btn-part">
            <button name="add-comment" id={props.data.selectedBook._id} onClick={props.data.handleClick} className="btn add-comment-btn">Add a comment</button>
            {
                props.data.selectedBook.added_by === props.data.user && (

                    <button name="del-book" onClick={props.data.handleClick} className="btn del-book-btn">Delete Book</button>
                )
            }
        
        </div>
    )
}

export default CommentButtons