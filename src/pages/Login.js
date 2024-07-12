import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Login.css'
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
      const userData = querySnapshot.docs[0].data();
      alert('Welcome to the site, ' + userData.username + '!');
      onLoginSuccess(userData); 
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-modal">
      <div className="modal">
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>

        <input 
          className='input'
          type="text" 
          required 
          onChange={e => setUsername(e.target.value)} 
          value={username}
        />
          <br></br>
        <label>Password</label>

        <input 
          className='input'
          type="password" 
          required 
          onChange={e => setPassword(e.target.value)} 
          value={password}
        />
          <br />
          <button className='button'>Login</button>
          <br /><br />
        </form>
      </div>
    </div>
  );
}

export default Login;