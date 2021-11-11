import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
const API = `/.netlify/functions`;

const App = () => {
  const [error, setError] = useState(null);
  const [formitem1, setFormitem1] = useState('');
  const [objects, setObjects] = useState([]);
  const [formitem2, setFormitem2] = useState('');

  useEffect(() => getPosts(), []);
  async function getPosts() {
    try {
      const res = await fetch(`${API}/get-posts`);
      const resAsJSON = await res.json();
      console.log(resAsJSON.data.data);
      const objects = resAsJSON.data.data[0].rows;
      setObjects(objects);
    } catch (error) {
      setError(error);
    }
  }

  async function addOrDeletePost({ addOrDelete, id, formitem1, formitem2 }) {
    if (addOrDelete === 'add' && (!formitem1 || !formitem2)) return;
    console.log(addOrDelete);
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
    <div style={{ width: 800 }}>
      {error && <p>Error: {error.message}</p>}
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
              formitem1 = '';
              formitem2 = '';
            }}
          >
            Clear
          </button>
          <hr />
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
                    id: post,
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
    </div>
  );
};

export default App;
