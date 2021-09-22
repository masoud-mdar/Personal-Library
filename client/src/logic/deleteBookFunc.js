const deleteBookFunc = (params) => {
    params.setIsSurelyDelete(true)
    params.setIsSurelyDelBook(true)
    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setIsAddNewBook(false)
}

export default deleteBookFunc