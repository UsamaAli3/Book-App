import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleBook from "./components/books/SingleBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/books/:slug" element={<SingleBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
