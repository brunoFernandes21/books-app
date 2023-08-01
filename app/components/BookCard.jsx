"use client"

export const BookCard = ({book}) => {
    return(
        <div className="bookCard">
            <img src={`${book.volumeInfo.imageLinks.smallThumbnail}`}/>
        </div>
    )
}