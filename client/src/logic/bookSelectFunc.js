const bookSelectFunc = (params, id) => {
    params.setIsLoading(true)
    params.setIsSurelyDelete(false)
    params.setIsSurelyDelBook(false)
    params.setIsAddNewBook(false)
    params.setIsShowComments(false)
    

    params.axios.get(`${params.BASE_URL}/api/books/${id}`).then(response => {
        const {data} = response
        //console.log(data)

        if (data.hasOwnProperty("error")) {
            //console.log(data)

        } else {

            params.setSelectedBook(data)
            params.setSelectedBookComments(data.comments)
            params.setSelectedBookId(data._id)
            params.setCommentMoreDetails(false)
            params.setIsAddComment(false)
            params.setIsEditComment(false)
            params.setMoreDetails(true)
        }
        
        params.setIsLoading(false)
    })


}

export default bookSelectFunc