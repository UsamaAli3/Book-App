import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VITE_BACKEND } from "../../App";

function SingleBook() {
  const [data, setData] = useState([]);

  const { slug } = useParams();

  const baseDataUrl = `${VITE_BACKEND}/api/books/${slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseDataUrl);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("Error :", error);
      }
    };
    fetchData();
  }, [slug]);

  const StarRating = ({ numberOfStare }) => {
    const stars = [];

    for (let i = 0; i < numberOfStare; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return <div>Rating: {stars}</div>;
  };

  return (
    <>
      <Link to={"/books"}>Back to Books</Link>
      {data.map((element) => (
        <div className="bookdetails " key={element._id}>
          <div className="col-1">
            <img
              src={`${VITE_BACKEND}/uploads/${element.thumbnail}`}
              alt={element.title}
            />
            <div>{element.title}</div>
            <br />
            <Link to={`/edit-book/${element.slug}`}>✏️Edit</Link>
          </div>
          <div className="col-2">
            <h1>{element.title}</h1>
            <p>{element.description}</p>
            <StarRating numberOfStare={element.stars} />
            <p>Categoray</p>
            <ul>
              {element.category.map((item) => (
                <li className="list-disc" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default SingleBook;
