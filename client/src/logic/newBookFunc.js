const newBookFunc = (params) => {
    params.setIsAddNewBook(prevIsAddNewBook => !prevIsAddNewBook)
    params.setIsAddComment(false)
    params.setIsEditComment(false)
}

export default newBookFunc