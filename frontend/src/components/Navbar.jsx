import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid black" }}>
      <Link to="/">Home</Link>{" "}
      <Link to="/add">Add Task</Link>
    </nav>
  );
}

export default Navbar;