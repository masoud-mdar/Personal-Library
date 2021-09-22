const allBooksFunc = (params) => {
    params.setIsLoading(true)
    params.axios.get(`${params.BASE_URL}/api/books`).then(response => {
        const {data} = response
        //console.log(data)
        if (data.hasOwnProperty("error")) {
            //console.log(data)
        } else {
            //console.log(data.length)
            let tempArr = data.map(book => {
                return {title: book.title, _id: book._id}
            })


            params.setAllBooksList(tempArr)
        }

        params.setIsLoading(false)
        
    })
}

export default allBooksFunc