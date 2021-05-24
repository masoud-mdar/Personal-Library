import React from "react"

const CommentMoreDetails = (props) => {

    return (
        <div className="comment-more-details">
            <button name="close" onClick={props.data.handleClick} className="btn close">X</button>

            <div className="text"><p>{props.data.selectedComment.commentText}</p></div>
            <div className="author"><p>By "{props.data.selectedComment.commentAuthor}"</p></div>
                

            <div className="comment-btn-part">

                <div className="comment-info">
                    
                    <span className="like-unlike-wrapper">
                        <span className="like">
                            <p>{props.data.selectedComment.agreed_by}</p>
                            <button name="agree" onClick={props.data.handleClick} className="agree-btn" style={{backgroundColor: props.data.selectedComment.agreed_by_me ? "#00ff93" : "#202529"}}>Agree</button>
                        </span>

                    
                    </span>

                    <span className="like-unlike-wrapper">
                        <span className="unlike">
                            <p>{props.data.selectedComment.disagreed_by}</p>
                            <button name="disagree" onClick={props.data.handleClick} className="disagree-btn" style={{backgroundColor: props.data.selectedComment.disagreed_by_me ? "#00ff93" : "#202529"}}>Disagree</button>
                        </span>

                    </span>
                </div>

                <div className="buttons">

                    {
                        props.data.selectedBook.added_by === props.data.user || props.data.selectedComment.commentAuthor === props.data.user ? (
                            <button name="delete-comment" id={props.data.selectedComment.commentId} onClick={props.data.handleClick}>Delete Comment</button>
                        ) : (
                            <div></div>
                        )

                    }
                    {
                        props.data.selectedComment.commentAuthor === props.data.user && (
                            <button name="edit-comment" id={props.data.selectedComment.commentId} onClick={props.data.handleClick}>Edit Comment</button>
                        )
                    }
                </div>

            </div>
        
        </div>
    )
}

export default CommentMoreDetails