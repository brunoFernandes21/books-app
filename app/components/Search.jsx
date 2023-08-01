"use client";
import { useState } from "react";
import { getBooksByTitle } from "../api/route";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await getBooksByTitle(search);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="border border-yellow-500">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="bg-blue-500 p-2 rounded text-white">Search</button>
        <button className="bg-blue-500 p-2 rounded text-white">Camera</button>
      </form>
      <div className="flex flex-row gap-4 mt-4 justify-center items-center">
        <p>Search by:</p>
        <div className="flex gap-4">
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold">Title</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold">Author</button>
          <button className="bg-gray-200 p-2 rounded-full text-sm font-bold">ISBN</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
