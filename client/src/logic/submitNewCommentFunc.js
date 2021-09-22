const submitNewCommentFunc = (params) => {
    params.setIsLoading(true)

    if (!params.isEditComment) {

        const sendingData = {
            comment: {
                commentText: params.newCommentInput,
                commentAuthor: params.user,
                commentId: (Math.random() + 10 * Math.random() + 10).toString(),
                agreed_by: [],
                disagreed_by: [],
                agreed_by_me: false,
                disagreed_by_me: false
            }
        }

        params.axios.post(`${params.BASE_URL}/api/books/${params.selectedBookId}`, sendingData).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                //console.log(data)
            } else {
                //alert comment submitted
                //console.log(data)
            }

            params.setIsAddComment(false)
            params.setCount(prevCount => prevCount + 1)
            params.setNewCommentInput("")
            params.setMoreDetails(false)
            params.setCommentMoreDetails(false)
            
        })

        params.setSelectedBook("")
        params.setSelectedBookComments([])

        params.axios.get(`${params.BASE_URL}/api/books/${params.selectedBookId}`).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                //console.log(data)
            } else {
                params.setSelectedBook(data)
                params.setSelectedBookComments(data.comments)
                params.setMoreDetails(true)
                params.setSelectedComment(data.comments[data.comments.length-1])
                params.setSelectedCommentId(data.comments[data.comments.length-1].commentId)
                params.setCommentMoreDetails(true)
                params.setIsShowComments(true)
                params.setIsLoading(false)
            }
        })


    } else if (params.isEditComment) {

        // axios.put for updating comment

        let tempCommentArr = {
            commentText: params.editCommentInput,
            commentAuthor: params.selectedComment.commentAuthor,
            commentId: params.selectedComment.commentId,
            agreed_by: [],
            disagreed_by: [],
            agreed_by_me: params.selectedComment.agreed_by_me,
            disagreed_by_me: params.selectedComment.disagreed_by_me
        }

        let agrTempArr = params.selectedComment.agreed_by.map(item => {
            return item
        })

        let disgTempArr = params.selectedComment.disagreed_by.map(item => {
            return item
        })

        tempCommentArr.agreed_by = agrTempArr
        tempCommentArr.disagreed_by = disgTempArr

        let tempAllCommentsArr = JSON.parse(JSON.stringify(params.selectedBookComments))

        let index

        for (let i=0; i<tempAllCommentsArr.length; i++) {
            if (tempAllCommentsArr[i].commentId === params.selectedCommentId) {
                index = i
            }
        }

        tempAllCommentsArr.splice(index, 1, tempCommentArr)

        const sendingData = {
            comments: tempAllCommentsArr
        }

        params.setSelectedBook("")
        params.setSelectedBookComments([])
        params.setCommentMoreDetails(false)
        params.setSelectedComment({})
        params.setEditCommentInput("")

        params.axios.put(`${params.BASE_URL}/api/books/${params.selectedBookId}`, sendingData).then(response => {
            const {data} = response
            params.setSelectedBookId("")

            params.axios.get(`${params.BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response
                //console.log(data)

                let tempArr = data.comments.filter(item => {
                    if (item.commentId === params.selectedCommentId) {
                        return true
                    } else {
                        return false
                    }
                })

                params.setSelectedBook(data)
                params.setSelectedBookId(data._id)
                params.setSelectedBookComments(data.comments)
                params.setCommentMoreDetails(true)
                params.setSelectedComment(tempArr[0])
                params.setIsEditComment(false)
                params.setIsAddComment(false)
                params.setIsLoading(false)
            })
            
        })

    }
}

export default submitNewCommentFunc