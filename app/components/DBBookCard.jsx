"use client";

import Link from "next/link";
import Trash from "@/public/images/trash-can.png"
import Image from "next/image";
import DefaultCover from "../../public/images/DefaultCover.jpg"
export const DBBookCard = ({ book, removeBook }) => {
  return (
    <div className="flex justify-content items-center flex-row relative" >
      <Link href={`http://localhost:3000/singlebook/${book.bookID}`} className="bookCard">
      {book.bookInfo.imageLinks ?
      <img src={book.bookInfo.imageLinks.smallThumbnail} alt={`${book.bookInfo.title}`}/> : <Image src={DefaultCover} alt="No cover available"/>}
      </Link>
      <button onClick={()=> removeBook(book, book.bookID)} className="absolute top-3 left-36 text-white bg-white p-2 rounded-full">
        <Image src={Trash} alt="Image of a trash can" width={30} height={30}/>
      </button>
    </div>
  );
};

