import React, { useState } from "react";
import axios from "axios";
import MarkdownEditor from "./MarkdownEditor";

const API = "http://localhost:3001/posts";

function PostForm({ onSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      status,
      date: new Date().toISOString().split("T")[0]
    };

    axios.post(API, newPost).then((res) => {
      alert("Đã lưu bài viết!");
      onSaved && onSaved(res.data);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Tiêu đề</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nội dung (Markdown)</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>

      <div className="mb-3">
        <label className="form-label">Trạng thái</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Nháp</option>
          <option value="published">Đã xuất bản</option>
        </select>
      </div>

      <button className="btn btn-primary">Lưu bài viết</button>
    </form>
  );
}

export default PostForm;
