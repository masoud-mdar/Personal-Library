import React from "react"

const CommentBottomPart = (props) => {

    return (
        <div className="bottom-part" style={{display: props.data.isShowComments ? "flex" : "none" }}>
            {
                props.data.selectedBook.commentcount > 0 && props.data.isShowComments && (
                    <div className="comment-list">
                        <ul>
                            {
                                props.data.selectedBookComments.map(comment => {
                                    return (
                                        <li key={Math.random() * Math.random()}>
                                            <button name="comment-more-details" id={comment.commentId} onClick={props.data.handleClick} className="btn comment">{comment.commentText}</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default CommentBottomPart