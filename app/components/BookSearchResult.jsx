
import { BookCard } from "./BookCard";

const BookSearchResult = ({ books }) => {
      return (
          <div className="book-title flex justify-center flex-col items-center bg-white p-2">
          <h3>Search Results</h3>
          {books.length !== 0 && <div className="flex flex-row gap-4 ">
            {books.map((book) => {
              return <BookCard book={book} key={book.id} />;
            })}
          </div>}
        </div>
      );
}

export default BookSearchResult