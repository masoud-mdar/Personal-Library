const editCommentFunc = (setIsEditComment, setIsAddComment, setIsAddNewBook, setEditCommentInput, selectedComment) => {
    setIsEditComment(true)
    setIsAddComment(false)
    setIsAddNewBook(false)
    setEditCommentInput(selectedComment.commentText)
}

export default editCommentFunc