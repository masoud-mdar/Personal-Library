const showCommentsFunc = (params) => {
    params.setIsShowComments(prevIsShowComments => !prevIsShowComments)
    params.setCommentMoreDetails(false)
    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setIsAddNewBook(false)
}

export default showCommentsFunc