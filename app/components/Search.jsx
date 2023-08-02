"use client";
import { useState } from "react";
import { getBooksBySearchTerm } from "../api/route";
import { Html5QrcodeScanner } from "html5-qrcode";

const Search = ({ setBooks }) => {
  const [search, setSearch] = useState("");
  const [criteria, setCriteria] = useState("intitle")

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const booksResult = await getBooksBySearchTerm(search, criteria);
      setBooks(booksResult)
      setSearch("")
    } catch (error) {
      console.log(error);
    }
  };
  const bookScanner = () => {
    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      if (decodedText.length === 10 || decodedText.length === 13) {
        console.log(decodedText)
        getBooksBySearchTerm(decodedText, "ISBN").then((data) => {
          setBooks(data)
          scanner.clear()
          document.getElementById("reader").remove()
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250
      },
      fps: 10,
    })
    return scanner.render(onScanSuccess, onScanFailure);
  }

  console.log(criteria)
  return (
    <div className=" flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="border border-yellow-500">
        <label htmlFor="search">Search {criteria == "ISBN" ? criteria : criteria.slice(2)}</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder={`Enter a real book's ${criteria == "ISBN" ? criteria : criteria.slice(2)}`}
          value={search}
          onChange={handleChange}
        />
        <button className="bg-blue-500 p-2 rounded text-white">Search</button>

      </form>
      <button className="bg-blue-500 p-2 rounded text-white" onClick={bookScanner}>Camera</button>
      <div className="flex flex-row gap-4 mt-4 justify-center items-center">
        <p>Search by :</p>
        <div className="flex gap-4">
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("intitle")}>Title</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("inauthor")}>Author</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("ISBN")}>ISBN</button>
        </div>
      </div>
      <div id="reader">
      </div>
      <div id="result">
      </div>
    </div>
  );
};

export default Search;
