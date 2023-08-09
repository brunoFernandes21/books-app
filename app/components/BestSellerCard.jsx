"use client";

import Link from "next/link";

export const BestSellerCard = ({ book }) => {
  return (
    <Link className='bookCard min-w-max'  href={`http://localhost:3000/singlebook/${book.id}`}>
        {book.imageLinks ?
        <img src={book.imageLinks.smallThumbnail} alt={`${book.title}`}/> : <img src="https://img.freepik.com/free-vector/open-blue-book-white_1308-69339.jpg?w=826&t=st=1[…]4e6e1b459442a3a22f4ff98073ddebe88a1700930b1c10a1b41660b511b70"/>}
    </Link>

  );
};
