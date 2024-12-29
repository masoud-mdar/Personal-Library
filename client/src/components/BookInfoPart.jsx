import React from "react"

const BookInfoPart = (props) => {

    return (
        <div className="info-part">
            <button name="close" onClick={props.data.handleClick} className="btn close">X</button>
            <div className="div"><p>Title: {props.data.selectedBook.title}</p></div>
            <div className="div"><p>Author: {props.data.selectedBook.author}</p></div>
            <div className="div"><p>Added By: {props.data.selectedBook.added_by}</p></div>
            <div className="div"><p>Added On: {props.data.selectedBook.added_on}</p></div>
            <div className="div"><p>Updated On: {props.data.selectedBook.updated_on}</p></div>
            <div className=" div comment-part">
                <p>{props.data.selectedBook.commentcount} comment{props.data.selectedBook.commentcount > 1 ? "s" : ""}</p>
                {
                    props.data.selectedBook.commentcount > 0 && (
                        <button name="show-comments" onClick={props.data.handleClick} className="btn show-comments-btn">{props.data.isShowComments ? "hide " : "show "}comments</button>
                    )
                }
            </div>
        </div>
    )
}

export default BookInfoPart