import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import Spinner from "../components/Spinner";
import LandingPage from "./LandingPage";

const IndexPage = () => {
  const PAGE_SIZE = 5;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${url}/posts`).then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const loadMorePosts = () => {
    const nextPage = Math.ceil(posts.length / PAGE_SIZE) + 1;
    axios.get(`${url}/posts?page=${nextPage}`).then((response) => {
      setPosts([...posts, ...response.data]);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <LandingPage />
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <button
        className="mx-auto max-w-[800px] flex justify-center text-white bg-slate-500 w-full m-4"
        onClick={loadMorePosts}
      >
        Load More
      </button>
    </>
  );
};

export default IndexPage;
