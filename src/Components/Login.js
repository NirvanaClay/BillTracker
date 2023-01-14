import { useState } from 'react';
import '../Styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // Do something with email and password here, like sending them to a server
    // Clear the form fields after submission
    setEmail('');
    setPassword('');
  }

  return (
    <div className='login-container'>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className='login-field'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' onChange={e => setEmail(e.target.value)} placeholder='Enter your email'/>
        </div>
        <div className='login-field'>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' onChange={e => setPassword(e.target.value)} placeholder='Enter your password'/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
