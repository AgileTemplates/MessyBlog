import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
const API = `/.netlify/functions`;

// State for loading, error and posts
const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formitem1, setFormitem1] = useState('');
  const [objects, setObjects] = useState([]);
  const [formitem2, setFormitem2] = useState('');
  const [formitem3, setFormitem3] = useState('');
  console.log(formitem2);

  // When the component renders for the first time, fetch all the posts
  useEffect(() => getPosts(), []);
  async function getPosts() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/get-posts`);
      const resAsJSON = await res.json();
      console.log(resAsJSON.data.data);
      const objects = resAsJSON.data.data[0].rows;
      setObjects(objects);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function addOrDeletePost({ addOrDelete, id, formitem1, formitem2 }) {
    if (addOrDelete === 'add' && (!formitem1 || !formitem2)) return;
    setLoading(true);
    const body =
      addOrDelete === 'add'
        ? JSON.stringify({
            title: formitem1,
            content: formitem2,
          })
        : JSON.stringify({ id });
    await fetch(`${API}/${addOrDelete}-post`, { method: 'POST', body });
    return getPosts();
  }
  return (
    <div className="App">
      {!loading && !error && (
        <>
          <header>
            <h1>MessyBlog</h1>
          </header>
          <form>
            <input
              placeholder={'Title'}
              value={formitem1}
              onChange={(e) => setFormitem1(e.target.value)}
            />
            <textarea
              placeholder={'Content'}
              value={formitem2}
              onChange={(e) => setFormitem2(e.target.value)}
            />
            <button
              onClick={() =>
                addOrDeletePost({ addOrDelete: 'add', formitem1, formitem2 })
              }
            >
              Post
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormitem1('');
                setFormitem2('');
                setFormitem3('');
              }}
            >
              Clear
            </button>
            <hr />
          </form>
          <div>
            {objects.map((post) => (
              <div style={{ marginBottom: 24 }}>
                <hr />
                <div>
                  <h3>{post.title}</h3>
                  <TimeAgo date={post.date} />
                  <p>{post.content}</p>
                </div>
                <button
                  onClick={() =>
                    addOrDeletePost({
                      addOrDelete: 'delete',
                      id: post.id,
                    })
                  }
                >
                  delete
                </button>
              </div>
            ))}
          </div>
          <hr />
        </>
      )}
      {error && !loading && <p>Error: {error.message}</p>}
      {loading && !error && <p>Loading...</p>}
    </div>
  );
};

export default App;
