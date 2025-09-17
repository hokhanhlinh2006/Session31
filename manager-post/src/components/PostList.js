import React, { useEffect, useState } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      });
    }
  };

  return (
    <div className="container mt-4">
      {}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Nhập từ khóa tìm kiếm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary">Thêm mới bài viết</button>
      </div>

      {}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Ngày viết</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {posts
            .filter((p) =>
              p.title.toLowerCase().includes(keyword.toLowerCase())
            )
            .map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </td>
                <td>{post.date}</td>
                <td>
                  {post.status === "published" ? (
                    <span className="btn btn-success btn-sm">Đã xuất bản</span>
                  ) : (
                    <span className="btn btn-secondary btn-sm">Nháp</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Chặn</button>
                  <button className="btn btn-info btn-sm me-2">Sửa</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
