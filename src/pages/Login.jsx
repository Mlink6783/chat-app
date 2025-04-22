import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !photo) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const user = { name, photo: reader.result };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/inbox');
    };
    reader.readAsDataURL(photo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">Login</h1>
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="file" accept="image/*" className="w-full" onChange={(e) => setPhoto(e.target.files[0])} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Enter</button>
      </form>
    </div>
  );
};

export default Login;