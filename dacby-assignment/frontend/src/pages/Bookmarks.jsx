import { useEffect, useState } from "react";
import axios from "axios";

function Bookmarks() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/stories/bookmarks/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        ⭐ Bookmarked Stories
      </h1>

      {stories.length === 0 ? (
        <p className="empty-message">
          No bookmarks yet 😢
        </p>
      ) : (
        stories.map((story) => (
          <div
            className="card"
            key={story._id}
          >
            <h2>{story.title}</h2>

            <p>
              <strong>Author:</strong>{" "}
              {story.author}
            </p>

            <p>
              <strong>Points:</strong>{" "}
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
  );
}

export default Bookmarks;