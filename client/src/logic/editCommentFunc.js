const editCommentFunc = (params) => {
    params.setIsEditComment(true)
    params.setIsAddComment(false)
    params.setIsAddNewBook(false)
    params.setEditCommentInput(params.selectedComment.commentText)
}

export default editCommentFunc