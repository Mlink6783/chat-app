import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage (could be expanded in a real app)
    const user = JSON.parse(localStorage.getItem('user'));
    const storedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    
    // Filter conversations based on the logged-in user
    setConversations(storedConversations.filter(convo => convo.users.includes(user.name)));
    
    // Mock users for search
    setUsers([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleConnect = (user) => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    
    // Create or update conversation between users
    const newConversation = {
      users: [loggedInUser.name, user.name],
      messages: [],
    };

    // Add to both users' inbox
    const storedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
    storedConversations.push(newConversation);
    localStorage.setItem('conversations', JSON.stringify(storedConversations));

    // Navigate to the chat page
    navigate(`/chat/${user.name}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      <input 
        type="text" 
        placeholder="Search Users..." 
        className="border p-2 rounded w-full mb-4" 
        value={search} 
        onChange={handleSearch} 
      />
      <ul className="space-y-4">
        {users
          .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
          .map(user => (
            <li key={user.name} className="border p-2 rounded">
              <button onClick={() => handleConnect(user)}>{user.name}</button>
            </li>
          ))}
      </ul>

      <h3 className="text-lg font-semibold mt-6">Your Conversations</h3>
      <ul className="space-y-4">
        {conversations.map((convo, idx) => (
          <li key={idx} className="border p-2 rounded">
            <button onClick={() => navigate(`/chat/${convo.users.find(u => u !== JSON.parse(localStorage.getItem('user')).name)}`)}>
              {convo.users.find(u => u !== JSON.parse(localStorage.getItem('user')).name)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;