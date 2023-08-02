"use client";
import { useState } from "react";
import { Featured } from "./components/Featured";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import BookSearchResult from "./components/BookSearchResult";
import {Html5QrcodeScanner} from "html5-qrcode";


export default function Home() {
  const [books, setBooks] = useState([]);

  const bookScanner = () => {
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      if(decodedText.length === 10 || decodedText.length === 13){
        console.log(`Code matched = ${decodedText}`, decodedResult);
        document.getElementById("result").innerHTML = `
        <h2> Success!</h2>
        <p>${decodedText}</p>`
        scanner.clear()
        document.getElementById("reader").remove()
        getBookByIsbn(decodedText)
      }
    }
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
    const scanner =  new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 10,
    })
    return scanner.render(onScanSuccess, onScanFailure);
  }

  
  return (
    <main>
      <Search setBooks={setBooks}/>
      <div id="reader">
            </div>
        <div id="result">
            </div>
            <button className="bg-blue-500 p-2 rounded text-white" onClick={bookScanner}>Camera</button>
      <section className="flex justify-center mt-10 p-10 border-4 border-red-600">
        <p>Welcome to MyBooks</p>
        <p>Search for books to add to your favourites</p>
        <p>your currently reading list, and save for later</p>
      </section>
      {/* <LandingPage/> */}
      {books.length > 0 && <div className=" border-orange border-4 p-10">
        <BookSearchResult books={books}/>
      </div>}
      {/* {books.length === 0 && <p>Sorry, could not find books! Try again.</p>} */}
      <section className="mt-40">
        <Featured />
      </section>
    </main>
  );
}
