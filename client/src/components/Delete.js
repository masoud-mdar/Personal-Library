import React from "react"

const Delete = (props) => {

    return (
        <div className="surely-delete">
            {
                !props.data.isSurelyDelBook && !props.data.isSurelyDelComment ? (
                    <h2>Are You sure you want to definitely Delete All the books?</h2>
                ) : props.data.isSurelyDelBook && !props.data.isSurelyDelComment ? (
                    <h2>Are You sure you want to definitely Delete the {props.data.selectedBook.title} from the list?</h2>
                ) : (
                    <h2>Are You sure you want to definitely Delete the comment?</h2>
                )
            }
            
            <button name="surely-delete" onClick={props.data.handleClick} className="btn yes">Yes</button>
            <button name="no-sure-del" onClick={props.data.handleClick} className="btn no">No</button>
        </div>
    )

}

export default Delete