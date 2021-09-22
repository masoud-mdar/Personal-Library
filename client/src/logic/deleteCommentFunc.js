const deleteCommentFunc = (params, id) => {
    
    params.setSelectedCommentId(id)
    params.setIsSurelyDelComment(true)

    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setIsAddNewBook(false)
    params.setIsSurelyDelBook(false)
    params.setIsSurelyDelete(true)
}

export default deleteCommentFunc