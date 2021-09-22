const parameters = (params, whichOne) => {
    const allParamsObject = {
        allBooksFuncParams : {
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            setIsLoading: params.setIsLoading,
            setAllBooksList: params.setAllBooksList
        },
        newBookFuncParams : {
            setIsAddNewBook: params.setIsAddNewBook,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment
        },
        submitNewBookFuncParams : {
            newBTitleInput: params.newBTitleInput,
            newBAuthorInput: params.newBAuthorInput,
            user: params.user,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setSelectedBookId: params.setSelectedBookId,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setMoreDetails: params.setMoreDetails,
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setIsLoading: params.setIsLoading,
            setCount: params.setCount,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setNewBTitleInput: params.setNewBTitleInput,
            setNewBAuthorInput: params.setNewBAuthorInput,
            setNewCommentInput: params.setNewCommentInput,
        },
        deleteAllFuncParams : {
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook
        },
        noSureDelFuncParams : {
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setIsSurelyDelComment: params.setIsSurelyDelComment
        },
        surelyDeleteFuncParams : {
            isSurelyDelBook: params.isSurelyDelBook,
            selectedBookId: params.selectedBookId,
            isSurelyDelComment: params.isSurelyDelComment,
            selectedBookComments: params.selectedBookComments,
            selectedCommentId: params.selectedCommentId,
            selectedBook: params.selectedBook,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            setIsAddNewBook: params.setIsAddNewBook,
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setCount: params.setCount,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setSelectedBookId: params.setSelectedBookId,
            setMoreDetails: params.setMoreDetails,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setSelectedCommentId: params.setSelectedCommentId,
            setSelectedComment: params.setSelectedComment,
            setIsSurelyDelComment: params.setIsSurelyDelComment,
        },
        bookSelectFuncParams : {
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            setIsLoading: params.setIsLoading,
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setIsAddNewBook: params.setIsAddNewBook,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setSelectedBookId: params.setSelectedBookId,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setMoreDetails: params.setMoreDetails,
            setIsShowComments: params.setIsShowComments
        },
        addCommentFuncParams : {
            setIsAddComment: params.setIsAddComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook
        },
        submitNewCommentFuncParams : {
            newCommentInput: params.newCommentInput,
            user: params.user,
            selectedBookId: params.selectedBookId,
            isEditComment: params.isEditComment,
            editCommentInput: params.editCommentInput,
            selectedComment: params.selectedComment,
            selectedBookComments: params.selectedBookComments,
            selectedCommentId: params.selectedCommentId,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            setIsLoading: params.setIsLoading,
            setIsEditComment: params.setIsEditComment,
            setIsAddComment: params.setIsAddComment,
            setCount: params.setCount,
            setNewCommentInput: params.setNewCommentInput,
            setMoreDetails: params.setMoreDetails,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setSelectedComment: params.setSelectedComment,
            setSelectedCommentId: params.setSelectedCommentId,
            setIsShowComments: params.setIsShowComments,
            setEditCommentInput: params.setEditCommentInput,
            setSelectedBookId: params.setSelectedBookId
        },
        deleteBookFuncParams : {
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook
        },
        commentMoreDetailsFuncParams : {
            selectedBookComments: params.selectedBookComments,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setSelectedCommentId: params.setSelectedCommentId,
            setSelectedComment: params.setSelectedComment,
            setIsSurelyDelete: params.setIsSurelyDelete,
            setIsSurelyDelBook: params.setIsSurelyDelBook
        },
        agreeFuncParams : {
            axios: params.axios,
            selectedBookComments: params.selectedBookComments,
            selectedComment: params.selectedComment,
            selectedCommentId: params.selectedCommentId,
            selectedBookId: params.selectedBookId,
            BASE_URL: params.BASE_URL,
            user: params.user,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setSelectedComment: params.setSelectedComment,
            setSelectedBookId: params.setSelectedBookId
        },
        disagreeFuncParams : {
            selectedComment: params.selectedComment,
            selectedBookComments: params.selectedBookComments,
            selectedCommentId: params.selectedCommentId,
            user: params.user,
            selectedBookId: params.selectedBookId,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setSelectedBook: params.setSelectedBook,
            setSelectedBookComments: params.setSelectedBookComments,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setSelectedComment: params.setSelectedComment,
            setSelectedBookId: params.setSelectedBookId
        },
        deleteCommentFuncParams : {
            setSelectedCommentId: params.setSelectedCommentId,
            setIsSurelyDelComment: params.setIsSurelyDelComment,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setIsSurelyDelBook: params.setIsSurelyDelBook,
            setIsSurelyDelete: params.setIsSurelyDelete
        },
        editCommentFuncParams : {
            selectedComment: params.selectedComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddComment: params.setIsAddComment,
            setIsAddNewBook: params.setIsAddNewBook,
            setEditCommentInput: params.setEditCommentInput,
        },
        showCommentsFuncParams : {
            setIsShowComments: params.setIsShowComments,
            setCommentMoreDetails: params.setCommentMoreDetails,
            setIsAddComment: params.setIsAddComment,
            setIsEditComment: params.setIsEditComment,
            setIsAddNewBook: params.setIsAddNewBook
        }
    }

    if (whichOne) {
        return allParamsObject[whichOne]
    }
}


export default parameters