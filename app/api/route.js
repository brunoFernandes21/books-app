import axios from "axios"

const myBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})

export const getBooksByTitle = async (title) => {
    const response = await myBooksApi.get(`?q=intitle:${title}`)
    console.log(response.data.items.slice(0, 3))
    return response.data.items.slice(0, 3)
} 