import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

const Write = () => {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.cat || "");
  
  const navigate = useNavigate();

 console.log(title + description + file + category);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            description,
            category,
            thumbnail: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            description,
            category,
            thumbnail: file ? imgUrl : "",
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 mt-6">
        <main className="px-2 lg:px-9 bg-slate-300" style={{ flex: "5" }}>
          {/* 1. Title */}
          <input
            className="lg:mt-6 p-3"
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 2 Description */}
          <div className="editor h-96 overflow-scroll lg:my-6 bg-white">
            <ReactQuill
              theme="snow"
              className="h-full border-none"
              value={description}
              onChange={setDescription}
            />
          </div>
        </main>

        <aside
          className="flex flex-col gap-6 bg-slate-300 px-3 py-6"
          style={{ flex: "2" }}
        >
          <h3
            className="bg-blue-500 px-4 py-2 font-semibold text-white text-center cursor-pointer items-center space-x-2 w-1/2 rounded"
            onClick={handleClick}
          >
            Publish
          </h3>

          <div className="flex justify-between">
            <span>
              <b>Status: </b>Draft
            </span>
            <span>
              <b>Visibility: </b>Public
            </span>
          </div>

          {/* 3. post thumbnail */}
          <div>
            <label className="font-semibold">Upload Post Thumbnail</label>
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className="relative mt-2 flex min-h-[99px] items-center justify-center cursor-pointer rounded-md border border-dashed border-blue-600 p-12 text-center"
            >
              Select Image
            </label>
          </div>

          <div>
            <label htmlFor="category">Select Post Category</label>
            <select
              id="category"
              className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-violet-500 p-2.5 block w-full"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Choose a Category</option>
              <option value="web">Web</option>
              <option value="java">Java</option>
              <option value="art">Art</option>
              <option value="dsa">DSA</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button className="bg-blue-300 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              Save as Draft
            </button>
            <button className="bg-blue-400 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              Update
            </button>
          </div>
        </aside>
      </div>
    </div>
    // <div>

    //   <input type="text" placeholder='title' name='title' value={title} onChange={handleChange}/>
    //   <input type="text" placeholder='description' name='description' value={description} onChange={handleChange}/>
    //   <input type="file" placeholder='title' id='file' name='file' value={file} onChange={handleChange}/>

    //   <select name="category" id="category" onChange={handleChange}>
    //   <option >Choose a Category</option>
    //   <option value="web">Web</option>
    //   <option value="java">Java</option>
    //   <option value="art">Art</option>
    //   <option value="dsa">DSA</option>
    //   </select>
    // <div>
    //   <h1>{title}</h1>
    //   <p>{description}</p>
    //   <img src={file} alt="" />
    //   <p>{category}</p>
    // </div>
    // </div>
  );
};

export default Write;
