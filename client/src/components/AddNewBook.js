import React from "react"

const AddNewBook = (props) => {

    return (
        <div className="add-new-book">
            <button name="close" onClick={props.data.handleClick} className="btn close">X</button>
            <input name="new-book-title" onChange={props.data.handleChange} value={props.data.newBTitleInput} placeholder="New book title..."></input>
            <input name="new-book-author" onChange={props.data.handleChange} value={props.data.newBAuthorInput} placeholder= "new book author..."></input>
            <button name="new-book-submit" onClick={props.data.handleClick} className="new-book-submit">Submit</button>
        
        </div>
    )
}

export default AddNewBook