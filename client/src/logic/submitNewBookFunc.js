const submitNewBookFunc = (setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setMoreDetails, setIsSurelyDelete, setIsSurelyDelBook, setIsLoading, setCount, setIsAddComment, setIsEditComment, setIsAddNewBook, newBTitleInput, newBAuthorInput, user, axios, BASE_URL, setNewBTitleInput, setNewBAuthorInput, setNewCommentInput, swal) => {
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
            swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })
        } else {

            setNewBTitleInput("")
            setNewBTitleInput("")
            setNewBAuthorInput("")
            setNewCommentInput("")

            //book select:

            axios.get(`${BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response

                if (data.hasOwnProperty("error")) {
                    swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `${data.error}`
                    })

                } else {

                    swal.fire(`${data.added_by}`, `The "${data.title}" written by "${data.author}" added successfully`, "success").then(
                        (result) => {

                          if (result.isConfirmed || result.isDismissed) {

                            setSelectedBook(data)
                            setSelectedBookComments(data.comments)
                            setSelectedBookId(data._id)
                            setCommentMoreDetails(false)
                            setMoreDetails(true)
                          }
                        }
                    )
                }

                setIsSurelyDelete(false)
                setIsSurelyDelBook(false)
                
                setIsLoading(false)
            })
        }

        setCount(prevCount => prevCount +1)
        
        
    })
}

export default submitNewBookFunc