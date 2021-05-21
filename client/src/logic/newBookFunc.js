const newBookFunc = (setIsAddNewBook, setIsAddComment, setIsEditComment) => {
    setIsAddNewBook(prevIsAddNewBook => !prevIsAddNewBook)
    setIsAddComment(false)
    setIsEditComment(false)
}

export default newBookFunc