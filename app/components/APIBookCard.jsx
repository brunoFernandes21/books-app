"use client";
import Image from "next/image";

import Link from "next/link";
import AltImage from "@/public/images/alt-image.png"
export const BookCard = ({ book }) => {
  return (
    <Link href={`http://localhost:3000/singlebook/${book.id}`} className="bookCard">
        {book.volumeInfo.imageLinks ?
        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title}`}/> : <Image src={AltImage} />}
    </Link>

  );
};
