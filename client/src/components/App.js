import React, {useEffect, useState} from "react"
import axios from "axios"

import Navbar from "./Navbar"
import AllBookButton from "./AllBookButton"
import EmptyBookList from "./EmptyBookList"
import AllBooksList from "./AllBooksList"
import Delete from "./Delete"
import AddNewBook from "./AddNewBook"
import BookInfoPart from "./BookInfoPart"
import AddComment from "./AddComment"
import EditComment from "./EditComment"
import CommentMoreDetails from "./CommentMoreDetails"
import CommentButtons from "./CommentButtons"
import CommentBottomPart from "./CommentBottomPart"
import Loading from "./Loading"

import {BASE_URL} from "../utils/constants"
import {user} from "../utils/constants"


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
    const [isShowComments, setIsShowComments] = useState(false)

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

        switch (name) {
            case "new-book-title":
                setNewBTitleInput(value)
                break
            case "new-book-author":
                setNewBAuthorInput(value)
                break
            case "new-comment":
                setNewCommentInput(value)
                break
            case "edit-comment":
                setEditCommentInput(value)
                break
            default:
                console.log(name)
                break
        }

    }

    const allBooksFunc = () => {
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
    }

    const newBookFunc = () => {
        setIsAddNewBook(prevIsAddNewBook => !prevIsAddNewBook)
        setIsAddComment(false)
        setIsEditComment(false)
    }

    const submitNewBookFunc = () => {
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

    const deleteAllFunc = () => {
        setIsSurelyDelete(true)
        setIsEditComment(false)
        setIsAddNewBook(false)
    }

    const noSureDelFunc = () => {
        setIsSurelyDelete(false)
        setIsSurelyDelBook(false)
        setIsSurelyDelComment(false)
    }

    const surelyDeleteFunc = () => {
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

    const bookSelectFunc = (id) => {
        setIsLoading(true)
        setIsSurelyDelete(false)
        setIsSurelyDelBook(false)
        setIsAddNewBook(false)
        

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
                setIsAddComment(false)
                setIsEditComment(false)
                setMoreDetails(true)
            }
            
            setIsLoading(false)
        })


    }

    const addCommentFunc = () => {

        setIsAddComment(true)
        setIsAddNewBook(false)
        setCommentMoreDetails(false)
        setIsSurelyDelete(false)
        setIsSurelyDelBook(false)
    }

    const submitNewCommentFunc = () => {
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

    const deleteBookFunc = () => {
        setIsSurelyDelete(true)
        setIsSurelyDelBook(true)
        setIsAddComment(false)
        setIsEditComment(false)
        setIsAddNewBook(false)
    }

    const commentMoreDetailsFunc = (id) => {
        setIsAddComment(false)
        setIsEditComment(false)
        setIsAddNewBook(false)

        setCommentMoreDetails(prevCommentMoreDetails => !prevCommentMoreDetails)
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
    }

    const agreeFunc = () => {
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

    const disagreeFunc = () => {
        setIsAddComment(false)
        setIsEditComment(false)
        setIsAddNewBook(false)


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
            })
            

        })


        //console.log(tempCommentArr)
    }

    const deleteCommentFunc = (id) => {
        setSelectedCommentId(id)
        setIsSurelyDelComment(true)

        setIsAddComment(false)
        setIsEditComment(false)
        setIsAddNewBook(false)
        setIsSurelyDelBook(false)
        setIsSurelyDelete(true)
    }

    const editCommentFunc = () => {
        setIsEditComment(true)
        setIsAddComment(false)
        setIsAddNewBook(false)
        setEditCommentInput(selectedComment.commentText)
    }

    const showCommentsFunc = () => {
        setIsShowComments(prevIsShowComments => !prevIsShowComments)
        setCommentMoreDetails(false)
        setIsAddComment(false)
        setIsEditComment(false)
        setIsAddNewBook(false)
    }

    const handleClick = (Event) => {
        const {name, id} = Event.target

        if (name === "all-books") {
            allBooksFunc()

        } else if (name === "add-new-book") {
            newBookFunc()

        } else if (name === "new-book-submit") {
            submitNewBookFunc()

        } else if (name === "delete-all") {
            deleteAllFunc()

        } else if (name === "no-sure-del") {
            noSureDelFunc()

        } else if (name === "surely-delete") {
            surelyDeleteFunc()

        } else if (name === "book-select") {
            bookSelectFunc(id)
            
        } else if (name === "add-comment") {
            addCommentFunc()

        } else if (name === "submit-new-comment") {
            submitNewCommentFunc()

        } else if (name === "del-book") {
            deleteBookFunc()

        } else if (name === "comment-more-details") {
            commentMoreDetailsFunc(id)

        } else if (name === "agree") {
            agreeFunc()

        } else if (name === "disagree") {
            disagreeFunc()

        } else if (name === "delete-comment") {
            deleteCommentFunc(id)

        } else if (name === "edit-comment") {
            editCommentFunc()

        } else if (name === "show-comments") {
            showCommentsFunc()

        }
    }


    return (
        <div>
            <Navbar />
            {
                !isLoading ? (
                    <div className="container">

                        <div className="all-books">

                            <AllBookButton 
                                data = {{
                                    handleClick: handleClick
                                }}
                            />

                            <div className="list-part">

                                {
                                    !allBooksList.length ? (

                                        <EmptyBookList />

                                    ) : (

                                        <AllBooksList 
                                            data = {{
                                                handleClick: handleClick,
                                                allBooksList: allBooksList
                                            }}
                                        />

                                    )
                                }

                            </div>
                        </div>



                        <div className="book-info">

                            {
                                isSurelyDelete && (

                                    <Delete
                                        data = {{
                                            handleClick: handleClick,
                                            isSurelyDelBook: isSurelyDelBook,
                                            isSurelyDelComment: isSurelyDelComment,
                                            selectedBook: selectedBook
                                        }}
                                    />
                                )
                            }

                                {
                                    isAddNewBook && (

                                        <AddNewBook
                                            data = {{
                                                handleClick: handleClick,
                                                handleChange: handleChange,
                                                newBTitleInput: newBTitleInput,
                                                newBAuthorInput: newBAuthorInput
                                            }}
                                        />
                                    )
                                }


                            {
                                moreDetails && (
                                    <div className="more-details">

                                        <div className="top-part">

                                            <BookInfoPart
                                                data = {{
                                                    handleClick: handleClick,
                                                    selectedBook: selectedBook,
                                                    isShowComments: isShowComments
                                                }}
                                            />

                                            {
                                                isAddComment && (

                                                    <AddComment
                                                        data = {{
                                                            handleClick: handleClick,
                                                            handleChange: handleChange,
                                                            newCommentInput: newCommentInput,
                                                            selectedBook: selectedBook
                                                        }}
                                                    />
                                                )
                                            }

                                            {
                                                isEditComment && (

                                                    <EditComment
                                                        data = {{
                                                            handleClick: handleClick,
                                                            handleChange: handleChange,
                                                            editCommentInput: editCommentInput,
                                                            selectedBook: selectedBook
                                                        }}
                                                    />
                                                )
                                            }

                                            {
                                                commentMoreDetails && (

                                                    <CommentMoreDetails
                                                        data = {{
                                                            handleClick: handleClick,
                                                            user: user,
                                                            selectedComment: selectedComment
                                                        }}
                                                    />
                                                )
                                            }

                                            <CommentButtons
                                                data = {{
                                                    handleClick: handleClick,
                                                    selectedBook: selectedBook,
                                                    user: user
                                                }}
                                            />

                                        </div>

                                        <CommentBottomPart
                                            data = {{
                                                handleClick: handleClick,
                                                selectedBook: selectedBook,
                                                isShowComments: isShowComments
                                            }}
                                        />
                                    </div>
                                )
                            }

                        </div>

                    </div>
                ) : (
                    <Loading />
                )
            }

        </div>
    )
}

export default App