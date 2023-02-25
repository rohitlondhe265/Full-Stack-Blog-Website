import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePost from "./pages/SinglePost";
import Write from "./pages/Write";

//react router dom outlet An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered.

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/post/:id",
          element: <SinglePost/>
        },
        {
          path: "/write",
          element: <Write/>
        }
      ]
    },

    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return (
    <div className="App md:container md:mx-auto">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
