import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseDataUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryVal, setCategoryVal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseDataUrl;
        if (categoryVal) {
          url += `?category=${categoryVal}`;
        }
        const dataUrl = await fetch(url);

        if (!dataUrl.ok) {
          console.log("Error occure in fetching the data");
        }
        const jsonData = await dataUrl.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.log("Error :", error);
        setLoading(false);
        setError("Somthing wents wrong: try again later");
      }
    };
    fetchData();
  }, [categoryVal]);

  return (
    <>
      <div>Books</div>
      <div className="filters">
        <label htmlFor="">Categories</label>
        <select onChange={(e) => setCategoryVal(e.target.value)}>
          <option value="">All</option>
          <option value="fiction">Fiction</option>
          <option value="adventure">Adventure</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </select>
      </div>
      {loading ? (
        "Loading..."
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h1>{item.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Book;
