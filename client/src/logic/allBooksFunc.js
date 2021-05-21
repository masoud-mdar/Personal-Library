const allBooksFunc = (setIsLoading, axios, BASE_URL, setAllBooksList) => {
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

export default allBooksFunc