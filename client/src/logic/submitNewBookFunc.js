const submitNewBookFunc = (setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setMoreDetails, setIsSurelyDelete, setIsSurelyDelBook, setIsLoading, setCount, setIsAddComment, setIsEditComment, setIsAddNewBook, newBTitleInput, newBAuthorInput, user, axios, BASE_URL, setNewBTitleInput, setNewBAuthorInput, setNewCommentInput) => {
    setIsLoading(true)

    setIsSurelyDelete(false)
    setIsSurelyDelBook(false)
    setIsAddComment(false)
    setIsEditComment(false)
    setCommentMoreDetails(false)
    setIsAddNewBook(false)

    const sendingData = {
        title: newBTitleInput,
        author: newBAuthorInput,
        added_by: user
    }

    axios.post(`${BASE_URL}/api/books`, sendingData).then(response => {
        const {data} = response

        if (data.hasOwnProperty("error")) {
            console.log(data)
        } else {
            console.log(data)
            setNewBTitleInput("")
            setNewBTitleInput("")
            setNewBAuthorInput("")
            setNewCommentInput("")

            //book select:

            axios.get(`${BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response
                console.log(data)

                if (data.hasOwnProperty("error")) {
                    console.log(data)

                } else {

                    setSelectedBook(data)
                    setSelectedBookComments(data.comments)
                    setSelectedBookId(data._id)
                    setCommentMoreDetails(false)
                    setMoreDetails(true)
                }

                setIsSurelyDelete(false)
                setIsSurelyDelBook(false)
                
                setIsLoading(false)
            })
        }

        setCount(prevCount => prevCount +1)
        //setIsLoading(false)
        
        
    })
}

export default submitNewBookFunc