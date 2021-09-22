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

import parameters from "../parameters/parameters"

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
                let allBooksFuncParams = parameters(variablesToExport, "allBooksFuncParams")
                allBooksFunc(allBooksFuncParams)
                break
            case "add-new-book" :
                let newBookFuncParams = parameters(variablesToExport, "newBookFuncParams")
                newBookFunc(newBookFuncParams)
                break
            case "new-book-submit" :
                let submitNewBookFuncParams = parameters(variablesToExport, "submitNewBookFuncParams")
                submitNewBookFunc(submitNewBookFuncParams)
                break
            case "delete-all" :
                let deleteAllFuncParams = parameters(variablesToExport, "deleteAllFuncParams")
                deleteAllFunc(deleteAllFuncParams)
                break
            case "no-sure-del" :
                let noSureDelFuncParams = parameters(variablesToExport, "noSureDelFuncParams")
                noSureDelFunc(noSureDelFuncParams)
                break
            case "surely-delete" :
                let surelyDeleteFuncParams = parameters(variablesToExport, "surelyDeleteFuncParams")
                surelyDeleteFunc(surelyDeleteFuncParams)
                break
            case "book-select" :
                let bookSelectFuncParams = parameters(variablesToExport, "bookSelectFuncParams")
                bookSelectFunc(bookSelectFuncParams, id)
                break
            case "add-comment" :
                let addCommentFuncParams = parameters(variablesToExport, "addCommentFuncParams")
                addCommentFunc(addCommentFuncParams)
                break
            case "submit-new-comment" :
                let submitNewCommentFuncParams = parameters(variablesToExport, "submitNewCommentFuncParams")
                submitNewCommentFunc(submitNewCommentFuncParams)
                break
            case "del-book" :
                let deleteBookFuncParams = parameters(variablesToExport, "deleteBookFuncParams")
                deleteBookFunc(deleteBookFuncParams)
                break
            case "comment-more-details" :
                let commentMoreDetailsFuncParams = parameters(variablesToExport, "commentMoreDetailsFuncParams")
                commentMoreDetailsFunc(commentMoreDetailsFuncParams, id)
                break
            case "agree" :
                let agreeFuncParams = parameters(variablesToExport, "agreeFuncParams")
                agreeFunc(agreeFuncParams)
                break
            case "disagree" :
                let disagreeFuncParams = parameters(variablesToExport, "disagreeFuncParams")
                disagreeFunc(disagreeFuncParams)
                break
            case "delete-comment" :
                let deleteCommentFuncParams = parameters(variablesToExport, "deleteCommentFuncParams")
                deleteCommentFunc(deleteCommentFuncParams, id)
                break
            case "edit-comment" :
                let editCommentFuncParams = parameters(variablesToExport, "editCommentFuncParams")
                editCommentFunc(editCommentFuncParams)
                break
            case "show-comments" :
                let showCommentsFuncParams = parameters(variablesToExport, "showCommentsFuncParams")
                showCommentsFunc(showCommentsFuncParams)
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

    const variablesToExport = {
        newCommentInput,
        isEditComment,
        editCommentInput,
        selectedComment,
        newBTitleInput,
        newBAuthorInput,
        isSurelyDelBook,
        selectedBookId,
        isSurelyDelComment,
        selectedBookComments,
        selectedCommentId,
        selectedBook,
        user,
        BASE_URL,
        axios,
        swal,
        setIsLoading,
        setAllBooksList,
        setIsAddNewBook,
        setIsAddComment,
        setIsEditComment,
        setSelectedBook,
        setSelectedBookComments,
        setSelectedBookId,
        setCommentMoreDetails,
        setMoreDetails,
        setIsSurelyDelete,
        setIsSurelyDelBook,
        setCount,
        setNewBTitleInput,
        setNewBAuthorInput,
        setNewCommentInput,
        setIsSurelyDelComment,
        setSelectedCommentId,
        setSelectedComment,
        setIsShowComments,
        setEditCommentInput
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