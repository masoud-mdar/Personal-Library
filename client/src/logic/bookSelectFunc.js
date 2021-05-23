const bookSelectFunc = (id, setIsLoading, setIsSurelyDelete, setIsSurelyDelBook, setIsAddNewBook, axios, BASE_URL, setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setIsAddComment, setIsEditComment, setMoreDetails, setIsShowComments) => {
    setIsLoading(true)
    setIsSurelyDelete(false)
    setIsSurelyDelBook(false)
    setIsAddNewBook(false)
    setIsShowComments(false)
    

    axios.get(`${BASE_URL}/api/books/${id}`).then(response => {
        const {data} = response
        console.log(data)

        if (data.hasOwnProperty("error")) {
            console.log(data)

        } else {

            setSelectedBook(data)
            setSelectedBookComments(data.comments)
            setSelectedBookId(data._id)
            setCommentMoreDetails(false)
            setIsAddComment(false)
            setIsEditComment(false)
            setMoreDetails(true)
        }
        
        setIsLoading(false)
    })


}

export default bookSelectFunc