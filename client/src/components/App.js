import React, {useEffect, useState} from "react"
import axios from "axios"
import swal from "sweetalert2"

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
import disagreeFunc from "../logic/disagreeFunc"
import deleteCommentFunc from "../logic/deleteCommentFunc"
import editCommentFunc from "../logic/editCommentFunc"
import showCommentsFunc from "../logic/showCommentsFunc"

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

    const [isSurelyDelete, setIsSurelyDelete] = useState(false)
    const [isSurelyDelBook, setIsSurelyDelBook] = useState(false)
    const [isSurelyDelComment, setIsSurelyDelComment] = useState(false)

    useEffect(() => {

        setIsLoading(true)

        axios.get(`${BASE_URL}/api/books`).then(response => {
            const {data} = response

            let tempArr = data.map(book => {
                return {title: book.title, _id: book._id}
            })
            setAllBooksList(tempArr)
            
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {

        setIsLoading(true)

        axios.get(`${BASE_URL}/api/books`).then(response => {
            const {data} = response

            let tempArr = data.map(book => {
                return {title: book.title, _id: book._id}
            })
            setAllBooksList(tempArr)

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

    const handleClick = (Event) => {
        const {name, id} = Event.target

        switch (name) {
            case "all-books" :
                allBooksFunc(setIsLoading, axios, BASE_URL, setAllBooksList)
                break
            case "add-new-book" :
                newBookFunc(setIsAddNewBook, setIsAddComment, setIsEditComment)
                break
            case "new-book-submit" :
                submitNewBookFunc(setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setMoreDetails, setIsSurelyDelete, setIsSurelyDelBook, setIsLoading, setCount, setIsAddComment, setIsEditComment, setIsAddNewBook, newBTitleInput, newBAuthorInput, user, axios, BASE_URL, setNewBTitleInput, setNewBAuthorInput, setNewCommentInput, swal)
                break
            case "delete-all" :
                deleteAllFunc(setIsSurelyDelete, setIsEditComment, setIsAddNewBook)
                break
            case "no-sure-del" :
                noSureDelFunc(setIsSurelyDelete, setIsSurelyDelBook, setIsSurelyDelComment)
                break
            case "surely-delete" :
                surelyDeleteFunc(setIsLoading, setIsAddNewBook, isSurelyDelBook, axios, BASE_URL, selectedBookId, setIsSurelyDelete, setIsSurelyDelBook, setCount, setSelectedBook, setSelectedBookComments, setSelectedBookId, setMoreDetails, setCommentMoreDetails, setIsAddComment, setIsEditComment, isSurelyDelComment, selectedBookComments, selectedCommentId, setSelectedCommentId, setSelectedComment, setIsSurelyDelComment, selectedBook, swal)
                break
            case "book-select" :
                bookSelectFunc(id, setIsLoading, setIsSurelyDelete, setIsSurelyDelBook, setIsAddNewBook, axios, BASE_URL, setSelectedBook, setSelectedBookComments, setSelectedBookId, setCommentMoreDetails, setIsAddComment, setIsEditComment, setMoreDetails, setIsShowComments)
                break
            case "add-comment" :
                addCommentFunc(setIsAddComment, setIsAddNewBook, setCommentMoreDetails, setIsSurelyDelete, setIsSurelyDelBook)
                break
            case "submit-new-comment" :
                submitNewCommentFunc(setIsLoading, setIsEditComment, newCommentInput, user, axios, BASE_URL, selectedBookId, setIsAddComment, setCount, setNewCommentInput, setMoreDetails, setCommentMoreDetails, setSelectedBook, setSelectedBookComments, isEditComment, setSelectedComment, setSelectedCommentId, setIsShowComments, editCommentInput, selectedComment, selectedBookComments, selectedCommentId, setEditCommentInput, setSelectedBookId)
                break
            case "del-book" :
                deleteBookFunc(setIsSurelyDelete, setIsSurelyDelBook, setIsAddComment, setIsEditComment, setIsAddNewBook)
                break
            case "comment-more-details" :
                commentMoreDetailsFunc(id, setIsAddComment, setIsEditComment, setIsAddNewBook, setCommentMoreDetails, setSelectedCommentId, selectedBookComments, setSelectedComment, setIsSurelyDelete, setIsSurelyDelBook)
                break
            case "agree" :
                agreeFunc(setIsAddComment, setIsEditComment, setIsAddNewBook, selectedComment, user, selectedBookComments, selectedCommentId, setSelectedBook, setSelectedBookComments, setCommentMoreDetails, setSelectedComment, axios, BASE_URL, selectedBookId, setSelectedBookId)
                break
            case "disagree" :
                disagreeFunc(setIsAddComment, setIsEditComment, setIsAddNewBook, selectedComment, user, selectedBookComments, selectedCommentId, setSelectedBook, setSelectedBookComments, setCommentMoreDetails, setSelectedComment, axios, BASE_URL, selectedBookId, setSelectedBookId)
                break
            case "delete-comment" :
                deleteCommentFunc(id, setSelectedCommentId, setIsSurelyDelComment, setIsAddComment, setIsEditComment, setIsAddNewBook, setIsSurelyDelBook, setIsSurelyDelete)
                break
            case "edit-comment" :
                editCommentFunc(setIsEditComment, setIsAddComment, setIsAddNewBook, setEditCommentInput, selectedComment)
                break
            case "show-comments" :
                showCommentsFunc(setIsShowComments, setCommentMoreDetails, setIsAddComment, setIsEditComment, setIsAddNewBook)
                break
            case "close":
                moreDetails && !isAddNewBook && !isEditComment && !commentMoreDetails && !isAddComment && setMoreDetails(false)
                isAddNewBook && setIsAddNewBook(false)
                isEditComment && setIsEditComment(false)
                isAddComment && setIsAddComment(false)
                commentMoreDetails && !isAddNewBook && !isEditComment && !isAddComment && setCommentMoreDetails(false)
                break

            default :
                console.log(name)
                break
        }
    }

    return (
        <div>
            
            {
                !isLoading ? (
                    <div className="container">
                        <Navbar
                            data={{
                                handleClick: handleClick,
                                user: user
                            }}
                        />

                        <div className="main-part">


                            <div className="all-books">

                                <AllBookButton 
                                    data = {{
                                        handleClick: handleClick
                                    }}
                                />


                                <AllBooksList 
                                    data = {{
                                        handleClick: handleClick,
                                        allBooksList: allBooksList
                                    }}
                                />

                               
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
                                    moreDetails ? (
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
                                                                selectedComment: selectedComment,
                                                                selectedBook: selectedBook
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
                                                    isShowComments: isShowComments,
                                                    selectedBookComments: selectedBookComments
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="more-details">
                                            <EmptyBookList />
                                        </div>
                                    )
                                }

                            </div>

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