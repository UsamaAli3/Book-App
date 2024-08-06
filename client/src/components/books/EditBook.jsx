import React, { useEffect, useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { VITE_BACKEND } from "../../App";

function EditBook() {
  const urlSlug = useParams();
  const navigate = useNavigate();

  const baseUrl = `${VITE_BACKEND}/api/books/${urlSlug.slug}`;
  console.log(baseUrl);
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStar] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);

      if (!response) {
        throw new Error("Failed to fetch data!");
      }

      const data = await response.json();
      //   console.log(data);

      {
        data.map((element) => {
          // console.log(element);

          setBookId(element._id);

          setTitle(element.title);
          setSlug(element.slug);
          setStar(element.stars);
          setCategory(element.category);
          setDescription(element.description);
          //   console.log(element.thumbnail);
          setThumbnail(element.thumbnail);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createBookHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`${VITE_BACKEND}/api/books`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
        console.log("Create Book Successfully!");
      } else {
        console.log("Faild to Create Book!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("bookId", bookId);

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`${VITE_BACKEND}/api/books`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        // setThumbnail(null);
        setSubmitted(true);
        console.log("Book added successfully!");
      } else {
        console.log("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const categoryHandle = (e) => {
    setCategory(e.target.value.split(",").map((category) => category.trim()));
  };

  const removeBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_BACKEND}/api/books${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/books");
        console.log("Delete book successfully!");
      }
    } catch (error) {
      console.log("Faild Delete book :", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Update Book</h1>
      <p>This is where we use Node.js, Express & MongoDB to grab some data.</p>
      <button onClick={removeBook} className="bg-red-600 text-white w-16 h-6">
        Delete
      </button>
      {submitted ? (
        <p>Data Update successfully!</p>
      ) : (
        <form onSubmit={createBookHandle} className="bookdetails">
          <div className="col-1">
            <div className="">
              <label>Upload Thumbnail</label>
              {!image ? (
                <img src={NoImageSelected} alt="preview image" />
              ) : (
                <img src={image} alt="preview image" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                onChange={imageChangeHandler}
              />
            </div>
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStar(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Categories (Comma-Separated)</label>
              <input type="test" value={category} onChange={categoryHandle} />
            </div>
            <input type="submit" value="Update Book" />
          </div>
        </form>
      )}
    </>
  );
}

export default EditBook;
