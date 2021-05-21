const surelyDeleteFunc = (setIsLoading, setIsAddNewBook, isSurelyDelBook, axios, BASE_URL, selectedBookId, setIsSurelyDelete, setIsSurelyDelBook, setCount, setSelectedBook, setSelectedBookComments, setSelectedBookId, setMoreDetails, setCommentMoreDetails, setIsAddComment, setIsEditComment, isSurelyDelComment, selectedBookComments, selectedCommentId, setSelectedCommentId, setSelectedComment, setIsSurelyDelComment) => {
    setIsLoading(true)
    setIsAddNewBook(false)

    if (isSurelyDelBook) {

        axios.delete(`${BASE_URL}/api/books/${selectedBookId}`, {data:{}}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                console.log(data)
            }

            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)
            setCount(prevCount => prevCount + 1)
            setSelectedBook("")
            setSelectedBookComments([])
            setSelectedBookId("")
            setMoreDetails(false)
            setCommentMoreDetails(false)
            setIsAddComment(false)
            setIsEditComment(false)
            setIsLoading(false)

        })

    } else if (isSurelyDelComment) {
        setIsLoading(true)

        let tempAllCommentsArr = JSON.parse(JSON.stringify(selectedBookComments))

        let index

        for (let i=0; i<tempAllCommentsArr.length; i++) {
            if (tempAllCommentsArr[i].commentId === selectedCommentId) {
                index = i
            }
        }

        tempAllCommentsArr.splice(index, 1)

        const sendingData = {
            commentcount: true,
            comments: tempAllCommentsArr
        }

        setSelectedBook("")
        setSelectedCommentId("")
        setSelectedBookComments([])
        setCommentMoreDetails(false)
        setSelectedComment({})

        axios.put(`${BASE_URL}/api/books/${selectedBookId}`, sendingData).then(response => {
            const {data} = response
            setSelectedBookId("")

            axios.get(`${BASE_URL}/api/books/${data._id}`).then(response => {
                const {data} = response
                console.log(data)

                //console.log(tempArr)

                setSelectedBook(data)
                setSelectedBookId(data._id)
                setSelectedBookComments(data.comments)

                setIsAddComment(false)
                setIsEditComment(false)
                setIsSurelyDelComment(false)
                setIsSurelyDelete(false)
                setIsLoading(false)
            })
            

        })

        //alert of success
        

    } else {

        axios.delete(`${BASE_URL}/api/books`, {data:{}}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                console.log(data)
            }

            setIsSurelyDelete(false)
            setCount(prevCount => prevCount + 1)
            setSelectedBook("")
            setSelectedBookComments([])
            setSelectedBookId("")
            setMoreDetails(false)
            setCommentMoreDetails(false)
            setIsAddComment(false)
            setIsEditComment(false)
            setIsLoading(false)

        })
    }
}

export default surelyDeleteFunc