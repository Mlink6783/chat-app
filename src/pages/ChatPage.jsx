import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
    const convo = conversations.find(convo => convo.users.includes(id));
    if (convo) {
      setMessages(convo.messages);
    }
  }, [id]);

  const handleSend = () => {
    if (message.trim() === '') return;

    const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
    const convoIndex = conversations.findIndex(convo => convo.users.includes(id));

    if (convoIndex !== -1) {
      conversations[convoIndex].messages.push(message);
      localStorage.setItem('conversations', JSON.stringify(conversations));
      setMessages(conversations[convoIndex].messages);
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat with {id}</h2>
      <div className="mb-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="p-2 bg-gray-200 rounded">
              {msg}
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <input 
          type="text" 
          className="border p-2 rounded w-full" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button 
          onClick={handleSend} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;