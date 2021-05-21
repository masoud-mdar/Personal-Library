const showCommentsFunc = (setIsShowComments, setCommentMoreDetails, setIsAddComment, setIsEditComment, setIsAddNewBook) => {
    setIsShowComments(prevIsShowComments => !prevIsShowComments)
    setCommentMoreDetails(false)
    setIsAddComment(false)
    setIsEditComment(false)
    setIsAddNewBook(false)
}

export default showCommentsFunc