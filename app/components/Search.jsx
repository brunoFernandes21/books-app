"use client";
import { useState } from "react";
import { getBooksBySearchTerm } from "../api/route";

const Search = ({ setBooks }) => {
  const [search, setSearch] = useState("");
  const [criteria, setCriteria] = useState("title")

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

  console.log(criteria)
  return (
    <div className=" flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="border border-yellow-500">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Enter a real book's title..."
          value={search}
          onChange={handleChange}
        />
        <button className="bg-blue-500 p-2 rounded text-white">Search</button>
        <button className="bg-blue-500 p-2 rounded text-white">Camera</button>
      </form>
      <div className="flex flex-row gap-4 mt-4 justify-center items-center">
        <p>Search by:</p>
        <div className="flex gap-4">
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("intitle")}>Title</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("inauthor")}>Author</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold" onClick={() => setCriteria("ISBN")}>ISBN</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
