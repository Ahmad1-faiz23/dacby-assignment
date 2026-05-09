import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Profile() {

  const [bookmarks,
    setBookmarks] =
      useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks =
    async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await axios.get(
          "http://localhost:5000/api/bookmarks",
          {
            headers:{
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setBookmarks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h1>
            {user?.name}
          </h1>

          <p>
            {user?.email}
          </p>

        </div>

        <h1 className="title">
          Saved Stories
        </h1>

        {bookmarks.length === 0 ? (

          <h2 className="empty-message">
            No bookmarks yet 😢
          </h2>

        ) : (

          bookmarks.map((story) => (

            <div
              className="card"
              key={story._id}
            >

              <h2>
                {story.title}
              </h2>

              <p>
                <strong>
                  Author:
                </strong>{" "}
                {story.author}
              </p>

              <p>
                <strong>
                  Points:
                </strong>{" "}
                {story.points}
              </p>

              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
              >
                Read Story
              </a>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Profile;