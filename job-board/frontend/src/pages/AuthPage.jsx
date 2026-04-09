import { useState } from 'react';
import axios from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? form : { email: form.email, password: form.password };
      const res = await axios.post(endpoint, payload);
      login(res.data);
      navigate(isRegister ? (form.role === 'employer' ? '/employer' : '/candidate') : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed.');
    }
  };

  return (
    <section className='auth-page'>
      <div className='auth-card'>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        {error && <div className='error'>{error}</div>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Name
              <input name='name' value={form.name} onChange={handleChange} required />
            </label>
          )}
          <label>
            Email
            <input name='email' type='email' value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name='password' type='password' value={form.password} onChange={handleChange} required />
          </label>
          {isRegister && (
            <label>
              Role
              <select name='role' value={form.role} onChange={handleChange}>
                <option value='candidate'>Candidate</option>
                <option value='employer'>Employer</option>
              </select>
            </label>
          )}
          <button className='button' type='submit'>{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <button className='button secondary' type='button' onClick={() => { setIsRegister(!isRegister); setError(''); }}>
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
    </section>
  );
};

export default AuthPage;
