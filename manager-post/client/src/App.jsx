import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import ListPost from "./pages/ListPost";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/" element={<Navigate to="/list-post" />} />
        <Route path="/list-post" element={<ListPost />} />
      </Routes>
    </Router>
  );
}

export default App;
