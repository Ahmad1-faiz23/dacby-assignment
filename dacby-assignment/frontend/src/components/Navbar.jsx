import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  FaUserCircle
} from "react-icons/fa";

function Navbar() {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const bookmarks =
    JSON.parse(
      localStorage.getItem(
        "bookmarks"
      )
    ) || [];

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme")
      || "dark"
    );

  const [showDropdown,
    setShowDropdown] =
      useState(false);

  useEffect(() => {

    document.body.className =
      theme;

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  const toggleTheme = () => {

    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.reload();
  };

  return (
    <nav className="navbar">

      <h1 className="logo">
        📝 Blog Website
      </h1>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/bookmarks">
          Bookmarks (
            {bookmarks.length}
          )
        </Link>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "dark"
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

        {!token ? (

          <>
            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="login-btn"
            >
              Register
            </Link>
          </>

        ) : (

          <div className="profile-box">

            <div
              className="profile-icon"
              onClick={() =>
                setShowDropdown(
                  !showDropdown
                )
              }
            >

              <FaUserCircle />

            </div>

            {showDropdown && (

              <div className="dropdown-menu">

                <h3>
                  {user?.name}
                </h3>

                <p>
                  {user?.email}
                </p>

                <Link
                  to="/profile"
                  className="profile-link"
                >
                  My Profile
                </Link>

                <button
                  className="logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        )}

      </div>
    </nav>
  );
}

export default Navbar;