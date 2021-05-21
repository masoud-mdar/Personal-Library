const deleteCommentFunc = (id, setSelectedCommentId, setIsSurelyDelComment, setIsAddComment, setIsEditComment, setIsAddNewBook, setIsSurelyDelBook, setIsSurelyDelete) => {
    setSelectedCommentId(id)
    setIsSurelyDelComment(true)

    setIsAddComment(false)
    setIsEditComment(false)
    setIsAddNewBook(false)
    setIsSurelyDelBook(false)
    setIsSurelyDelete(true)
}

export default deleteCommentFunc