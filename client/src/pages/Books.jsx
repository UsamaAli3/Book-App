import React from "react";
import Book from "../components/books/Book";
import { Link } from "react-router-dom";

function Books() {
  return (
    <>
      <Link to={"/books/create-book"}>+ Add Book</Link>
      <Book />
    </>
  );
}

export default Books;
