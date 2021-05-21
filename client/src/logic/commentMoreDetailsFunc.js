const commentMoreDetailsFunc = (id, setIsAddComment, setIsEditComment, setIsAddNewBook, setCommentMoreDetails, setSelectedCommentId, selectedBookComments, setSelectedComment, setIsSurelyDelete, setIsSurelyDelBook) => {
    setIsAddComment(false)
    setIsEditComment(false)
    setIsAddNewBook(false)

    setCommentMoreDetails(prevCommentMoreDetails => !prevCommentMoreDetails)
    setSelectedCommentId(id)

    console.log(selectedBookComments)
    let tempArr = selectedBookComments.filter(comment => {
        if (comment.commentId === id) {
            return true
        } else {
            return false
        }
    })

    //console.log(tempArr)
    //console.log(id)

    setSelectedComment(tempArr[0])

    setIsAddComment(false)
    setIsSurelyDelete(false)
    setIsSurelyDelBook(false)
}

export default commentMoreDetailsFunc