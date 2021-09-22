const commentMoreDetailsFunc = (params, id) => {
    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setIsAddNewBook(false)

    params.setCommentMoreDetails(prevCommentMoreDetails => !prevCommentMoreDetails)
    params.setSelectedCommentId(id)

    //console.log(selectedBookComments)
    let tempArr = params.selectedBookComments.filter(comment => {
        if (comment.commentId === id) {
            return true
        } else {
            return false
        }
    })

    //console.log(tempArr)
    //console.log(id)

    params.setSelectedComment(tempArr[0])

    params.setIsAddComment(false)
    params.setIsSurelyDelete(false)
    params.setIsSurelyDelBook(false)
}

export default commentMoreDetailsFunc