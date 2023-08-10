"use client";
import { useEffect, useState, useRef } from "react";
import { getBooksBySearchTerm } from "../api/route";
import { Html5QrcodeScanner } from "html5-qrcode";
import {BsCamera} from "react-icons/bs"
import { VoiceRecognition } from "./VoiceRecognition";
const Search = ({ setBooks, books , setError, setShowSearchResults}) => {
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
      setShowSearchResults(true)
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };

  const inputRef = useRef();

  useEffect(() => {    
    setSearchCriteria("intitle")

    }, [])

  const setSearchCriteria = (criteria) => {
    setCriteria(criteria)
    const currentButton = document.getElementById(criteria)
    currentButton.classList.add("button-focus")
    const buttons = document.querySelectorAll('button');
    const arrayList = Array.from(buttons)
    const removedButtons = arrayList.filter((button) => 
    {return button.id !== criteria})
    removedButtons.forEach((button) => {
      button.classList.remove("button-focus")
    })
  }

  const bookScanner = () => {
    function onScanSuccess(decodedText, decodedResult) {
      if (decodedText.length === 10 || decodedText.length === 13) {
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

  // console.log("ref", inputRef)


  return (
    <div className="p-4 m-auto mt-5 flex justify-center items-center flex-col bg-white rounded-2xl text-slate-800 max-w-2xl">
      <h2 className="font-bold text-xl ">Search for a book</h2>

      <div className="flex flex-row gap-4 mt-4 justify-center items-center">
        <p>Search by :</p>
        <div className="flex gap-4 text-white" ref={inputRef}>
          <button autoFocus className="bg-slate-800 p-2 rounded-full text-sm font-bold" onClick={() => setSearchCriteria("intitle")} id="intitle" >Title</button>
          <button className="bg-slate-800 p-2 rounded-full text-sm font-bold" onClick={() => setSearchCriteria("inauthor")} id="inauthor">Author</button>
          <button className="bg-slate-800 p-2 rounded-full text-sm font-bold" onClick={() => setSearchCriteria("ISBN")} id="ISBN">ISBN</button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className=" flex justify-center items-center mt-4 w-full">
        <label className="items-start" htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder={`by ${criteria == "ISBN" ? criteria : criteria.slice(2)}...`}
          value={search}
          onChange={handleChange}
          className="border border-slate-800 rounded p-2 mx-2 w-80"
          required
        />
        <button className="font-bold bg-slate-800 hover:bg-blue-500 p-2 rounded text-white m-right">Search</button>

      </form>
      <p className="font-bold mt-8 mb-2">Search by camera or voice</p>
      <div className="flex justify-center items-center gap-4">
      <button className=" text-4xl rounded-full bg-slate-800 hover:bg-blue-500 p-2 text-white" onClick={bookScanner}><BsCamera/></button>
      <VoiceRecognition setSearch={setSearch}/>
      </div>
      <div id="reader">
      </div>
      <div id="result">
      </div>
    </div>
  );
};

export default Search;
