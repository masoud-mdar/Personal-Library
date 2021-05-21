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

import allBooksFunc from "../logic/allBooksFunc"
import newBookFunc from "../logic/newBookFunc"
import submitNewBookFunc from "../logic/submitNewBookFunc"
import deleteAllFunc from "../logic/deleteAllFunc"
import noSureDelFunc from "../logic/noSureDelFunc"
import surelyDeleteFunc from "../logic/surelyDeleteFunc"
import bookSelectFunc from "../logic/bookSelectFunc"
import addCommentFunc from "../logic/addCommentFunc"
import submitNewCommentFunc from "../logic/submitNewCommentFunc"
import deleteBookFunc from "../logic/deleteBookFunc"
import commentMoreDetailsFunc from "../logic/commentMoreDetailsFunc"
import agreeFunc from "../logic/agreeFunc"

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
            allBooksFunc(setIsLoading, axios, BASE_URL, setAllBooksList)

        } else if (name === "add-new-book") {
            newBookFunc(setIsAddNewBook, setIsAddComment, setIsEditComment)

        } else if (name === "new-book-submit") {
            submitNewBookFunc(setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setMoreDetails, setIsSurelyDelete, setIsSurelyDelBook, setIsLoading, setCount, setIsAddComment, setIsEditComment, setIsAddNewBook, newBTitleInput, newBAuthorInput, user, axios, BASE_URL, setNewBTitleInput, setNewBAuthorInput, setNewCommentInput)

        } else if (name === "delete-all") {
            deleteAllFunc(setIsSurelyDelete, setIsEditComment, setIsAddNewBook)

        } else if (name === "no-sure-del") {
            noSureDelFunc(setIsSurelyDelete, setIsSurelyDelBook, setIsSurelyDelComment)

        } else if (name === "surely-delete") {
            surelyDeleteFunc(setIsLoading, setIsAddNewBook, isSurelyDelBook, axios, BASE_URL, selectedBookId, setIsSurelyDelete, setIsSurelyDelBook, setCount, setSelectedBook, setSelectedBookComments, setSelectedBookId, setMoreDetails, setCommentMoreDetails, setIsAddComment, setIsEditComment, isSurelyDelComment, selectedBookComments, selectedCommentId, setSelectedCommentId, setSelectedComment, setIsSurelyDelComment)

        } else if (name === "book-select") {
            bookSelectFunc(id, setIsLoading, setIsSurelyDelete, setIsSurelyDelBook, setIsAddNewBook, axios, BASE_URL, setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setIsAddComment, setIsEditComment, setMoreDetails)
            
        } else if (name === "add-comment") {
            addCommentFunc(setIsAddComment, setIsAddNewBook, setCommentMoreDetails, setIsSurelyDelete, setIsSurelyDelBook)

        } else if (name === "submit-new-comment") {
            submitNewCommentFunc(setIsLoading, setIsEditComment, newCommentInput, user, axios, BASE_URL, selectedBookId, setIsAddComment, setCount, setNewCommentInput, setMoreDetails, setCommentMoreDetails, setSelectedBook, setSelectedBookComments, isEditComment, setSelectedComment, setSelectedCommentId, setIsShowComments, editCommentInput, selectedComment, selectedBookComments, selectedCommentId, setEditCommentInput, setSelectedBookId)

        } else if (name === "del-book") {
            deleteBookFunc(setIsSurelyDelete, setIsSurelyDelBook, setIsAddComment, setIsEditComment, setIsAddNewBook)

        } else if (name === "comment-more-details") {
            commentMoreDetailsFunc(id, setIsAddComment, setIsEditComment, setIsAddNewBook, setCommentMoreDetails, setSelectedCommentId, selectedBookComments, setSelectedComment, setIsSurelyDelete, setIsSurelyDelBook)

        } else if (name === "agree") {
            agreeFunc(setIsAddComment, setIsEditComment, setIsAddNewBook, selectedComment, user, selectedBookComments, selectedCommentId, setSelectedBook, setSelectedBookComments, setCommentMoreDetails, setSelectedComment, axios, BASE_URL, selectedBookId, setSelectedBookId)

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