import Navbar from "./components/Navbar";
import "./app.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Privacy from "./Privacy";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      fetch("https://localhost:4500/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Content_Type: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status(200)) return response.json();
          throw new Error("Authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  useEffect(() => {
    const getUser = () => {
      fetch("https://localhost:4500/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

// <form onSubmit={postName}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="submit">Send Name</button>
//       </form>
//       <p>{home.name}</p>
//       <p>{home.age}</p>
// const [name, setName] = useState("");
// const [home, setHome] = useState({});
// useEffect(() => {
//   axios.get("/home").then(function (response) {
//     setHome(response.data);
//   });
// }, []);
// async function postName(e) {
//   e.preventDefault();
//   try {
//     await axios.post("/post_name", {
//       name,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
