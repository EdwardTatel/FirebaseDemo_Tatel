import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert('Welcome to the site!');
      onLoginSuccess(q); 
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-modal">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            Username:
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </label>
          <br />
          <label>
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </label>
          <br />
          <button>Login</button>
          <br /><br />
        </form>
      </div>
    </div>
  );
}

export default Login;