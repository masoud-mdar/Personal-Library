const submitNewBookFunc = (params) => {
    params.setIsLoading(true)

    params.setIsSurelyDelete(false)
    params.setIsSurelyDelBook(false)
    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setCommentMoreDetails(false)
    params.setIsAddNewBook(false)

    const sendingData = {
        title: params.newBTitleInput,
        author: params.newBAuthorInput,
        added_by: params.user
    }

    params.axios.post(`${params.BASE_URL}/api/books`, sendingData).then(response => {
        const {data} = response

        if (data.hasOwnProperty("error")) {
            params.swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })
        } else {

            params.setNewBTitleInput("")
            params.setNewBTitleInput("")
            params.setNewBAuthorInput("")
            params.setNewCommentInput("")

            //book select:

            params.axios.get(`${params.BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response

                if (data.hasOwnProperty("error")) {
                    params.swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `${data.error}`
                    })

                } else {

                    params.swal.fire(`${data.added_by}`, `The "${data.title}" written by "${data.author}" added successfully`, "success").then(
                        (result) => {

                          if (result.isConfirmed || result.isDismissed) {

                            params.setSelectedBook(data)
                            params.setSelectedBookComments(data.comments)
                            params.setSelectedBookId(data._id)
                            params.setCommentMoreDetails(false)
                            params.setMoreDetails(true)
                          }
                        }
                    )
                }

                params.setIsSurelyDelete(false)
                params.setIsSurelyDelBook(false)
                
                params.setIsLoading(false)
            })
        }

        params.setCount(prevCount => prevCount +1)
        
        
    })
}

export default submitNewBookFunc