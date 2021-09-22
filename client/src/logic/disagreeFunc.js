const disagreeFunc = (params) => {
    
    params.setIsAddComment(false)
    params.setIsEditComment(false)
    params.setIsAddNewBook(false)


    let tempCommentArr = {
        commentText: params.selectedComment.commentText,
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
    
    let disagreeIndex = tempCommentArr.disagreed_by.indexOf(params.user)

    if (disagreeIndex === -1) {

        tempCommentArr.disagreed_by_me = true
        tempCommentArr.disagreed_by.push(params.user)
        let agreeIndex = tempCommentArr.agreed_by.indexOf(params.user)
        if (agreeIndex !== -1) {
            tempCommentArr.agreed_by.splice(agreeIndex, 1)
            tempCommentArr.agreed_by_me = false
        }
        //setSelectedComment(tempCommentArr)

    } else {
        tempCommentArr.disagreed_by_me = false
        tempCommentArr.disagreed_by.splice(disagreeIndex, 1)
        //setSelectedComment(tempCommentArr)
    }

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

    params.axios.put(`${params.BASE_URL}/api/books/${params.selectedBookId}`, sendingData).then(response => {
        const {data} = response
        params.setSelectedBookId("")

        params.axios.get(`${params.BASE_URL}/api/books/${data._id}`).then(response => {
            const {data} = response

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
        })
    })
}

export default disagreeFunc