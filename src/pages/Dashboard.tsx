import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { CreateContentModal } from '../components/Modal/CreateContentModal';
import { Sidebar } from '../components/Sidebar/Sidebar';
import Cards from './Cards';
import useContentStore from '../store/contentStore';
import { PlusIcon, ShareIcon , SendIcon } from '../icons/Icon';
import axios from 'axios';

// Define types
interface Message {
  role: 'user' | 'bot';
  text: string;
}

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { shareBrain, loading, filterType } = useContentStore();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleShare = async () => {
    const url = await shareBrain();
    if (url) {
      console.log('Share URL:', url);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    try {

      const token = localStorage.getItem("token");

      if (!token) throw new Error("No authentication token found");

      const response = await axios.post( 

          `${import.meta.env.VITE_BACKEND_URL}api/v1/content/search`, 
             { text: inputText } , 
             { headers :
                {   Authorization : `Bearer ${token}`}  
             }
        );

        console.log(response);
        
      setChatMessages([...chatMessages, { role: 'user', text: inputText }, { role: 'bot', text: response.data.message}]);

      setInputText('');
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-72 w-full min-h-screen bg-gray-100">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Top Action Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <Button
            startIcon={<PlusIcon size={'md'} />}
            size="sm"
            variant="primary"
            text="Add Content"
            onClick={() => setModalOpen(true)}
          />

          <Button
            startIcon={<ShareIcon size={'md'} />}
            size="md"
            variant="secondary"
            text="Share Brain"
            onClick={handleShare}
            loading={loading}
          />
        </div>

        {/* Chat Section */}
        {filterType == null && (
          <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <div className="relative flex items-center border rounded-md p-2">
              <input
                className="w-full p-2 outline-none border-none text-gray-700"
                type="text"
                placeholder="Type your question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button 
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={sendMessage}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex flex-col gap-3 mb-6">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-md rounded-lg shadow-md ${
                msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200'
              }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'ChatGPT'}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
