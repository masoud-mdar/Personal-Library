import React from "react"

const AddComment = (props) => {

    return (
        <div className="add-new-comment">
            <input name="new-comment" onChange={props.data.handleChange} value={props.data.newCommentInput} placeholder="Add a new comment..."></input>
            <button name="submit-new-comment" id={props.data.selectedBook._id} onClick={props.data.handleClick} className="submit-new-comment">Submit</button>
            <button name="close" onClick={props.data.handleClick} className="btn close">X</button>
        </div>
    )
}

export default AddComment