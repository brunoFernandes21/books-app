"use client"

export const SearchBookCard = ({book}) => {
    console.log(book, "from featuredcard");
    return(
        <div className="bookCard">
            <img src={`${book.volumeInfo.imageLinks.smallThumbnail}`}/>
        </div>
    )
}