import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleBook from "./components/books/SingleBook";
import CreateBook from "./components/books/CreateBook";
import EditBook from "./components/books/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/books/:slug" element={<SingleBook />} />
        <Route path="/books/create-book" element={<CreateBook />} />
        <Route path="/edit-book/:slug" element={<EditBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
