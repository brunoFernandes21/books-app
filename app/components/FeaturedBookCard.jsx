"use client"

export const FeaturedBookCard = ({book}) => {
    
    return(
        <div className="bookCard">
            <img src={`${book.volumeInfo.imageLinks.smallThumbnail}`}/>
        </div>
    )
}