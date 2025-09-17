// client/src/components/PostList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  // Gọi API lấy danh sách bài viết
  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Lọc bài viết theo từ khóa (title hoặc author)
  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Danh sách bài viết</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Danh sách bài viết */}
      <div className="list-group">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="list-group-item">
              <h5>{post.title}</h5>
              <small className="text-muted">Tác giả: {post.author}</small>
              <div className="mt-2">
                <ReactMarkdown>{post.content.substring(0, 150) + "..."}</ReactMarkdown>
              </div>
              <Link to={`/posts/${post.id}`} className="btn btn-sm btn-primary mt-2">
                Xem chi tiết
              </Link>
            </div>
          ))
        ) : (
          <p>Không có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}

export default PostList;
