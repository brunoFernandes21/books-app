import axios from "axios"

const myBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})

export const getBooksBySearchTerm = async (searchTerm, criteria) => {
    const response = await myBooksApi.get(`?q=${criteria}:${searchTerm}`)
    return response.data.items;
}
export const getFeaturedBooks = async () => {
    const response = await myBooksApi.get(`?q=averageRating`)
    return response.data.items
}

export const fetchBookById = async (id) => {
    const response = await myBooksApi.get(`/${id}`)
    return response.data.volumeInfo
}
