import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStar] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);
  const [thumbnail, setThumbnail] = useState(null);

  const createBookHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
        setThumbnail(null);
        console.log("Create Book Successfully!");
      } else {
        console.log("Faild to Create Book!");
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

  return (
    <>
      <h1 className="text-2xl font-semibold">Create Book</h1>
      <p>This is where we use Node.js, Express & MongoDB to grab some data.</p>
      {submitted ? (
        <p>Data Submitted successfully!</p>
      ) : (
        <form onSubmit={createBookHandle} className="bookdetails">
          <div className="col-1">
            <div className="">
              <label>Upload Thumbnail</label>
              <img src={image} alt="preview image" />
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
            <input
              type="test"
              value={category}
              onChange={categoryHandle}
            />
          </div>
          <input type="submit" value="Add Book" />
        </div>
        </form>
      )}
    </>
  );
}

export default CreateBook;
