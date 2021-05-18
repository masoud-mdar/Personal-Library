import React, {useEffect, useState} from "react"
import axios from "axios"

const BASE_URL = "http://localhost:5000"
const user = "demoUser"

const App = () => {

    const [allBooksList, setAllBooksList] = useState([])

    const [newBTitleInput, setNewBTitleInput] = useState("")
    const [newBAuthorInput, setNewBAuthorInput] = useState("")
    const [newCommentInput, setNewCommentInput] = useState("")
    const [editCommentInput, setEditCommentInput] = useState("")

    const [isAddNewBook, setIsAddNewBook] = useState(false)

    const [selectedBook, setSelectedBook] = useState({})
    const [selectedBookComments, setSelectedBookComments] = useState([])
    const [selectedBookId, setSelectedBookId] = useState("")

    const [moreDetails, setMoreDetails] = useState(false)

    const [selectedComment, setSelectedComment] = useState({})
    const [selectedCommentId, setSelectedCommentId] = useState("")

    const [commentMoreDetails, setCommentMoreDetails] = useState(false)

    const [isAddComment, setIsAddComment] = useState(false)
    const [isEditComment, setIsEditComment] = useState(false)

    // should put setIsEditComment(false) and setEditCommentInput("") everywhere!

    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(0)
    //const [commentCounter, setCommentCounter] = useState(0)

    const [isSurelyDelete, setIsSurelyDelete] = useState(false)
    const [isSurelyDelBook, setIsSurelyDelBook] = useState(false)
    const [isSurelyDelComment, setIsSurelyDelComment] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${BASE_URL}/api/books`).then(response => {
            const {data} = response
            console.log(data)
            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                console.log(data.length)
                let tempArr = data.map(book => {
                    return {title: book.title, _id: book._id}
                })


                setAllBooksList(tempArr)
            }

            setIsLoading(false)

        })

    }, [])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${BASE_URL}/api/books`).then(response => {
            const {data} = response
            console.log(data)
            if (data.hasOwnProperty("error")) {
                console.log(data)
            } else {
                console.log(data.length)
                let tempArr = data.map(book => {
                    return {title: book.title, _id: book._id}
                })


                setAllBooksList(tempArr)
            }

            setIsLoading(false)

        })

    }, [count])



    const handleChange = (Event) => {
        const {name, value} = Event.target

        if (name === "new-book-title") {
            setNewBTitleInput(value)
        } else if (name === "new-book-author") {
            setNewBAuthorInput(value)
        } else if (name === "new-comment") {
            setNewCommentInput(value)
        } else if (name === "edit-comment") {
            setEditCommentInput(value)
        }
    }

    const handleClick = (Event) => {
        const {name, id} = Event.target

        if (name === "all-books") {
            setIsLoading(true)
            axios.get(`${BASE_URL}/api/books`).then(response => {
                const {data} = response
                console.log(data)
                if (data.hasOwnProperty("error")) {
                    console.log(data)
                } else {
                    console.log(data.length)
                    let tempArr = data.map(book => {
                        return {title: book.title, _id: book._id}
                    })


                    setAllBooksList(tempArr)
                }

                setIsLoading(false)
                
            })

        } else if (name === "add-new-book") {
            setIsAddNewBook(prevIsAddNewBook => !prevIsAddNewBook)

        } else if (name === "new-book-submit") {
            setIsLoading(true)

            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)
            setIsAddComment(false)
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
            


        } else if (name === "delete-all") {
            setIsSurelyDelete(true)
        } else if (name === "no-sure-del") {
            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)
            setIsSurelyDelComment(false)
        } else if (name === "surely-delete") {
            setIsLoading(true)

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
                    setIsLoading(false)
    
                })
            }



        } else if (name === "book-select") {
            console.log(id)
            setIsLoading(true)
            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)
            

            axios.get(`${BASE_URL}/api/books/${id}`).then(response => {
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
                
                setIsLoading(false)
            })




            

        } else if (name === "add-comment") {
            console.log(id)
            setIsAddComment(true)
            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)
        } else if (name === "submit-new-comment") {
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
                        setCommentMoreDetails(true)
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
                        setIsLoading(false)
                    })
                    
                })

            }



        } else if (name === "del-book") {
            //console.log(selectedBookId)

            setIsSurelyDelete(true)
            setIsSurelyDelBook(true)
            setIsAddComment(false)

        } else if (name === "comment-more-details") {

            setCommentMoreDetails(true)
            setSelectedCommentId(id)

            console.log(selectedBookComments)
            let tempArr = selectedBookComments.filter(comment => {
                if (comment.commentId === id) {
                    return true
                } else {
                    return false
                }
            })

            //console.log(tempArr)
            //console.log(id)

            setSelectedComment(tempArr[0])

            setIsAddComment(false)
            setIsSurelyDelete(false)
            setIsSurelyDelBook(false)

        } else if (name === "agree") {
            setIsLoading(true)

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
//...............................................
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
                    setIsLoading(false)
                })
                

            })
            /////////////////////////

            //console.log(tempCommentArr)

        } else if (name === "disagree") {

            setIsLoading(true)

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
            
            let disagreeIndex = tempCommentArr.disagreed_by.indexOf(user)

            if (disagreeIndex === -1) {

                tempCommentArr.disagreed_by_me = true
                tempCommentArr.disagreed_by.push(user)
                let agreeIndex = tempCommentArr.agreed_by.indexOf(user)
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
                    setIsLoading(false)
                })
                

            })


            //console.log(tempCommentArr)
        } else if (name === "delete-comment") {
            console.log(id)
            setSelectedCommentId(id)
            setIsSurelyDelComment(true)

            setIsSurelyDelBook(false)
            setIsSurelyDelete(true)
        } else if (name === "edit-comment") {
            setIsEditComment(true)
            setEditCommentInput(selectedComment.commentText)
        }
    }


    // Delete a comment
    // agree, disagree system: add an ID for each comment, add agreed by, disagreed by for each comment
    return (
        <div>
            <div className="nav-bar"></div>
            {
                !isLoading ? (
                    <div className="container">

                        <div className="all-books">
                            <div className="btn-part">
                                <div className="add-book">
                                    {/*<button name="all-books" onClick={handleClick} className="btn">Show me all</button>*/}
                                    <button name="add-new-book" onClick={handleClick} className="btn add-book-btn">+</button>
                                </div>

                                <div className="delete-all">
                                    <button name="delete-all" onClick={handleClick} className="btn del-book-btn">!</button>
                                </div>
                            </div>

                            <div className="list-part">

                                {
                                    !allBooksList.length ? (
                                        <div className="empty-books-list">
                                            <h2>
                                                No book in here...
                                            </h2>
                                        </div>
                                    ) : (
                                        <div className="all-books-list">
                                            <ul>
                                                {
                                                    allBooksList.map(book => {
                                                        return (
                                                            <li key={Math.random() * Math.random()}>
                                                                <button name="book-select" id={book._id} onClick={handleClick} className="btn book-select-btn">{book.title}</button>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                }

                                {
                                    isAddNewBook && (
                                        <div className="add-new-book">
                                            <input name="new-book-title" onChange={handleChange} value={newBTitleInput} placeholder="New book title..."></input>
                                            <input name="new-book-author" onChange={handleChange} value={newBAuthorInput} placeholder= "new book author..."></input>
                                            <button name="new-book-submit" onClick={handleClick}>Submit</button>
                                            <button name="close" onClick={handleClick}>X</button>
                                        </div>
                                    )
                                }

                            </div>




                        </div>



                        <div className="book-info">

                            {
                                isSurelyDelete && (
                                    <div className="surely-delete">
                                        {
                                            !isSurelyDelBook && !isSurelyDelComment ? (
                                                <h2>Are You sure you want to definitely Delete All the books?</h2>
                                            ) : isSurelyDelBook && !isSurelyDelComment ? (
                                                <h2>Are You sure you want to definitely Delete the {selectedBook.title} from the list?</h2>
                                            ) : (
                                                <h2>Are You sure you want to definitely Delete the comment?</h2>
                                            )
                                        }
                                        
                                        <button name="surely-delete" onClick={handleClick}>Yes</button>
                                        <button name="no-sure-del" onClick={handleClick}>No</button>
                                    </div>
                                )
                            }

                            <br />

                            {
                                moreDetails && (
                                    <div className="more-details">

                                        <div className="top-part">

                                            <div className="info-part">
                                            <button name="close" onClick={handleClick} className="btn close">X</button>
                                                <div><p>Title: {selectedBook.title}</p></div>
                                                <div><p>Author: {selectedBook.author}</p></div>
                                                <div><p>Added By: {selectedBook.added_by}</p></div>
                                                <div><p>Added On: {selectedBook.added_on}</p></div>
                                                <div><p>Updated On: {selectedBook.updated_on}</p></div>
                                                <div><p>{selectedBook.commentcount} comment{selectedBook.commentcount > 1 ? "s" : ""}</p></div>
                                            </div>

                                            <div className="btn-part">
                                                <button name="add-comment" id={selectedBook._id} onClick={handleClick} className="btn add-comment-btn">Add a comment</button>
                                                {
                                                    selectedBook.added_by === user && (

                                                        <button name="del-book" onClick={handleClick} className="btn del-book-btn">Delete Book</button>
                                                    )
                                                }
                                                
                                            </div>
                                        </div>



                                        <div className="bottom-part">


                                            {
                                                selectedBook.commentcount && (
                                                    <div className="comment-list">
                                                        <ul>
                                                            {
                                                                selectedBookComments.map(comment => {
                                                                    return (
                                                                        <li key={Math.random() * Math.random()}>
                                                                            <button name="comment-more-details" id={comment.commentId} onClick={handleClick}>{comment.commentText}</button>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            }

                                            {
                                                isAddComment && (
                                                    <div className="add-new-comment">
                                                        <input name="new-comment" onChange={handleChange} value={newCommentInput} placeholder="Add a new comment..."></input>
                                                        <button name="submit-new-comment" id={selectedBook._id} onClick={handleClick}>Submit</button>
                                                        <button name="close" onClick={handleClick}>X</button>
                                                    </div>
                                                )
                                            }

                                            {
                                                isEditComment && (
                                                    <div className="edit-comment">
                                                        <input name="edit-comment" onChange={handleChange} value={editCommentInput}></input>
                                                        <button name="submit-new-comment" id={selectedBook._id} onClick={handleClick}>Submit</button>
                                                        <button name="close" onClick={handleClick}>X</button>
                                                    </div>
                                                )
                                            }

                                            {
                                                commentMoreDetails && (
                                                    <div className="comment-more-details">
                                                        <p>Comment: {selectedComment.commentText}</p>
                                                        <p>By: {selectedComment.commentAuthor}</p>
                                                        <p>agreed by: {selectedComment.agreed_by}</p>
                                                        <p>disagreed by: {selectedComment.disagreed_by}</p>
                                                        <button name="agree" onClick={handleClick}>Agree</button>
                                                        <button name="disagree" onClick={handleClick}>Disagree</button>
                                                        {
                                                            selectedBook.added_by === user || selectedComment.commentAuthor === user ? (
                                                                <button name="delete-comment" id={selectedComment.commentId} onClick={handleClick}>Delete Comment</button>
                                                            ) : (
                                                                <div></div>
                                                            )

                                                        }
                                                        {
                                                            selectedComment.commentAuthor === user && (
                                                                <button name="edit-comment" id={selectedComment.commentId} onClick={handleClick}>Edit Comment</button>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                )
                                            }



                                        </div>









                                    </div>
                                )
                            }

                        </div>









                    </div>
                ) : (
                    <div className="loading">
                        <h1>Loading...</h1>
                    </div>
                )
            }

        </div>
    )
}

export default App