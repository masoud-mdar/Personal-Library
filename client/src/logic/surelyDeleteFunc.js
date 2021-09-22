const surelyDeleteFunc = (params) => {
    params.setIsLoading(true)
    params.setIsAddNewBook(false)

    if (params.isSurelyDelBook) {

        params.axios.delete(`${params.BASE_URL}/api/books/${params.selectedBookId}`, {data:{}}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                params.swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `${data.error}`
                })
            } else {
                params.swal.fire(`${params.selectedBookId}`, `${sparams.electedBook.title} deleted successfully`, "success").then(
                    (result) => {
                      if (result.isConfirmed || result.isDismissed) {

                        params.setIsSurelyDelete(false)
                        params.setIsSurelyDelBook(false)
                        params.setCount(prevCount => prevCount + 1)
                        params.setSelectedBook({})
                        params.setSelectedBookComments([])
                        params.setSelectedBookId("")
                        params.setMoreDetails(false)
                        params.setCommentMoreDetails(false)
                        params.setIsAddComment(false)
                        params.setIsEditComment(false)
                      }
                    }
                )
            }

            params.setIsLoading(false)

        })

    } else if (params.isSurelyDelComment) {
        params.setIsLoading(true)

        let tempAllCommentsArr = JSON.parse(JSON.stringify(params.selectedBookComments))

        let index

        for (let i=0; i<tempAllCommentsArr.length; i++) {
            if (tempAllCommentsArr[i].commentId === params.selectedCommentId) {
                index = i
            }
        }

        tempAllCommentsArr.splice(index, 1)

        const sendingData = {
            commentcount: true,
            comments: tempAllCommentsArr
        }

        params.setSelectedBook("")
        params.setSelectedCommentId("")
        params.setSelectedBookComments([])
        params.setCommentMoreDetails(false)
        params.setSelectedComment({})

        params.axios.put(`${params.BASE_URL}/api/books/${params.selectedBookId}`, sendingData).then(response => {
            const {data} = response
            params.setSelectedBookId("")

            params.axios.get(`${params.BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response
                //console.log(data)

                //console.log(tempArr)

                params.setSelectedBook(data)
                params.setSelectedBookId(data._id)
                params.setSelectedBookComments(data.comments)

                params.setIsAddComment(false)
                params.setIsEditComment(false)
                params.setIsSurelyDelComment(false)
                params.setIsSurelyDelete(false)
                params.setIsLoading(false)
            })
            

        })

        //alert of success
        

    } else {

        params.axios.delete(`${params.BASE_URL}/api/books`, {data:{}}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                //console.log(data)
            } else {
                //console.log(data)
            }

            params.setIsSurelyDelete(false)
            params.setCount(prevCount => prevCount + 1)
            params.setSelectedBook("")
            params.setSelectedBookComments([])
            params.setSelectedBookId("")
            params.setMoreDetails(false)
            params.setCommentMoreDetails(false)
            params.setIsAddComment(false)
            params.setIsEditComment(false)
            params.setIsLoading(false)

        })
    }
}

export default surelyDeleteFunc