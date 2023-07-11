import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Welcome to my blog! In this first post, I wanted to share my excitement about starting this new journey of writing and sharing my thoughts with the world. I believe that through this blog, we can connect, learn, and inspire each other. Stay tuned for more interesting content coming your way!"
    },
    {
      id: 2,
      title: "Exploring React Hooks",
      datetime: "August 15, 2021 02:30:12 PM",
      body: "In this post, I dive into the world of React Hooks and discuss how they can simplify state management and lifecycle methods in React applications."
    },
    {
      id: 3,
      title: "Mastering CSS Grid Layout",
      datetime: "September 27, 2021 09:45:21 AM",
      body: "CSS Grid Layout is a powerful tool for creating complex and responsive web layouts. In this post, I share my insights and best practices for mastering this layout system."
    },
    {
      id: 4,
      title: "Building a RESTful API with Express",
      datetime: "November 10, 2021 04:12:59 PM",
      body: "Learn how to build a RESTful API using the Express framework in Node.js. I provide a step-by-step guide on setting up routes, handling requests, and connecting to a database."
    },
    {
      id: 5,
      title: "Introduction to Data Visualization with D3.js",
      datetime: "January 05, 2022 10:08:05 AM",
      body: "Data visualization is a crucial aspect of presenting information effectively. In this post, I introduce D3.js, a popular JavaScript library for creating interactive and dynamic data visualizations."
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
