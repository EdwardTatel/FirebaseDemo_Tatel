import { useNavigate, useParams } from "react-router-dom"
import {getDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';

import './create.css';

export default function Article() {
  const { urlId } = useParams()
  const navigate = useNavigate()

  console.log("id: " + urlId)

  const [article, setArticle] = useState(null);
  const [editArticle, setEditArticle] = useState({ id: urlId, title: '', author: '', description: '' });
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot) => {
        const data = snapshot.data();
        setArticle(data);
        setEditArticle({ id: urlId, ...data });
      });

  }, [urlId]);

  // if (!article) {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // }

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', editArticle.id);
    await updateDoc(ref, {
      title: editArticle.title,
      author: editArticle.author,
      description: editArticle.description,
    });
    setShowEditForm(false);
    setArticle(editArticle);
  };

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <>
          {!showEditForm ? (
            <div key={article.id}>
              <h2>{article.title}</h2>
              <p>By {article.author}</p>
              <p>{article.description}</p>
              <button className="leftalign" onClick={handleEditClick}>Edit</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="page-title">Edit Article</h2>
              <label>
                <span>Title:</span>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={editArticle.title}
                  required
                />
              </label>

              <label>
                <span>Author:</span>
                <input
                  type="text"
                  name="author"
                  onChange={handleChange}
                  value={editArticle.author}
                  required
                />
              </label>

              <label>
                <span>Description:</span>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={editArticle.description}
                  required
                />
              </label>

              <button>Save</button>
            </form>
          )}
        </>
      )}
    </div>
  )
}