import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Lỗi fetch posts:", err));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Danh sách bài viết</h2>
      <input
        type="text"
        placeholder="Tìm bài viết..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <small>Tác giả: {post.author}</small>
            <ReactMarkdown>{post.content.substring(0, 100) + "..."}</ReactMarkdown>
            <br />
            <Link to={`/post/${post.id}`}>Xem chi tiết</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PostList;
