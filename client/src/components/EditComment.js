import React from "react"

const EditComment = (props) => {

    return (
        <div className="edit-comment">
            <input name="edit-comment" onChange={props.data.handleChange} value={props.data.editCommentInput}></input>
            <button name="submit-new-comment" id={props.data.selectedBook._id} onClick={props.data.handleClick} className="submit-new-comment">Submit</button>
            <button name="close" onClick={props.data.handleClick} className="close">X</button>
        </div>
    )
}

export default EditComment