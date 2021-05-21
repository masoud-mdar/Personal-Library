const submitNewCommentFunc = (setIsLoading, setIsEditComment, newCommentInput, user, axios, BASE_URL, selectedBookId, setIsAddComment, setCount, setNewCommentInput, setMoreDetails, setCommentMoreDetails, setSelectedBook, setSelectedBookComments, isEditComment, setSelectedComment, setSelectedCommentId, setIsShowComments, editCommentInput, selectedComment, selectedBookComments, selectedCommentId, setEditCommentInput, setSelectedBookId) => {
    setIsLoading(true)

    if (!isEditComment) {

        const sendingData = {
            comment: {
                commentText: newCommentInput,
                commentAuthor: user,
                commentId: (Math.random() + 10 * Math.random() + 10).toString(),
                agreed_by: [],
                disagreed_by: [],
                agreed_by_me: false,
                disagreed_by_me: false
            }
        }

        axios.post(`${BASE_URL}/api/books/${selectedBookId}`, sendingData).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                //alert comment submitted
                console.log(data)
            }

            setIsAddComment(false)
            setCount(prevCount => prevCount + 1)
            setNewCommentInput("")
            setMoreDetails(false)
            setCommentMoreDetails(false)
            
        })

        setSelectedBook("")
        setSelectedBookComments([])

        axios.get(`${BASE_URL}/api/books/${selectedBookId}`).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                setSelectedBook(data)
                setSelectedBookComments(data.comments)
                setMoreDetails(true)
                setSelectedComment(data.comments[data.comments.length-1])
                setSelectedCommentId(data.comments[data.comments.length-1].commentId)
                setCommentMoreDetails(true)
                setIsShowComments(true)
                setIsLoading(false)
            }
        })


    } else if (isEditComment) {

        // axios.put for updating comment

        let tempCommentArr = {
            commentText: editCommentInput,
            commentAuthor: selectedComment.commentAuthor,
            commentId: selectedComment.commentId,
            agreed_by: [],
            disagreed_by: [],
            agreed_by_me: selectedComment.agreed_by_me,
            disagreed_by_me: selectedComment.disagreed_by_me
        }

        let agrTempArr = selectedComment.agreed_by.map(item => {
            return item
        })

        let disgTempArr = selectedComment.disagreed_by.map(item => {
            return item
        })

        tempCommentArr.agreed_by = agrTempArr
        tempCommentArr.disagreed_by = disgTempArr

        let tempAllCommentsArr = JSON.parse(JSON.stringify(selectedBookComments))

        let index

        for (let i=0; i<tempAllCommentsArr.length; i++) {
            if (tempAllCommentsArr[i].commentId === selectedCommentId) {
                index = i
            }
        }

        tempAllCommentsArr.splice(index, 1, tempCommentArr)

        const sendingData = {
            comments: tempAllCommentsArr
        }

        setSelectedBook("")
        setSelectedBookComments([])
        setCommentMoreDetails(false)
        setSelectedComment({})
        setEditCommentInput("")

        axios.put(`${BASE_URL}/api/books/${selectedBookId}`, sendingData).then(response => {
            const {data} = response
            setSelectedBookId("")

            axios.get(`${BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response
                console.log(data)

                let tempArr = data.comments.filter(item => {
                    if (item.commentId === selectedCommentId) {
                        return true
                    } else {
                        return false
                    }
                })

                setSelectedBook(data)
                setSelectedBookId(data._id)
                setSelectedBookComments(data.comments)
                setCommentMoreDetails(true)
                setSelectedComment(tempArr[0])
                setIsEditComment(false)
                setIsAddComment(false)
                setIsLoading(false)
            })
            
        })

    }
}

export default submitNewCommentFunc