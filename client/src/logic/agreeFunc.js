const agreeFunc = (setIsAddComment, setIsEditComment, setIsAddNewBook, selectedComment, user, selectedBookComments, selectedCommentId, setSelectedBook, setSelectedBookComments, setCommentMoreDetails, setSelectedComment, axios, BASE_URL, selectedBookId, setSelectedBookId) => {
    setIsAddComment(false)
    setIsEditComment(false)
    setIsAddNewBook(false)
    

    // axios.put for updating comment

    let tempCommentArr = {
        commentText: selectedComment.commentText,
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
    
    let agreeIndex = tempCommentArr.agreed_by.indexOf(user)
    //console.log(user)
    //console.log(tempCommentArr.agreed_by)
    //console.log(agreeIndex)

    if (agreeIndex === -1) {

        tempCommentArr.agreed_by_me = true
        tempCommentArr.agreed_by.push(user)
        let disagreeIndex = tempCommentArr.disagreed_by.indexOf(user)
        if (disagreeIndex !== -1) {
            tempCommentArr.disagreed_by.splice(disagreeIndex, 1)
            tempCommentArr.disagreed_by_me = false
        }
        //setSelectedComment(tempCommentArr)

    } else {
        tempCommentArr.agreed_by_me = false
        tempCommentArr.agreed_by.splice(agreeIndex, 1)
        //setSelectedComment(tempCommentArr)
    }

    ////////////////////////////////

    let tempAllCommentsArr = JSON.parse(JSON.stringify(selectedBookComments))
    //console.log(selectedCommentId)

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

    //console.log(selectedBook)
    //console.log(selectedBookComments)
    setSelectedBook("")
    setSelectedBookComments([])
    setCommentMoreDetails(false)
    setSelectedComment({})

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
            //console.log(tempArr)

            setSelectedBook(data)
            setSelectedBookId(data._id)
            setSelectedBookComments(data.comments)
            setCommentMoreDetails(true)
            setSelectedComment(tempArr[0])
        })
        

    })
    /////////////////////////

    //console.log(tempCommentArr)
}

export default agreeFunc