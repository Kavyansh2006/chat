import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

// Initialize socket outside component to avoid reconnects on re-render
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["websocket"]
});

function ChatRoom({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  // Fetch initial chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to load history", error);
      }
    };
    fetchHistory();
  }, []);

  // Handle Socket.io events
  useEffect(() => {
    socket.emit('userJoined', currentUser);

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('activeUsers', (users) => {
      // Create a unique list of users (in case the same user connects from multiple tabs)
      const uniqueUsers = Array.from(new Map(users.map(u => [u._id, u])).values());
      setActiveUsers(uniqueUsers);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('activeUsers');
    };
  }, [currentUser]);

  const sendMessage = (content) => {
    socket.emit('sendMessage', {
      userId: currentUser._id,
      content: content
    });
  };

  return (
    <div className="glass-panel chat-room-container">
      {/* Sidebar for Online Users */}
      <div className="chat-sidebar">
        <h3 style={{ marginBottom: '24px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--text-muted)' }}>Online Now &mdash; {activeUsers.length}</h3>
        <ul style={{ listStyle: 'none', overflowY: 'auto', flex: 1, paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeUsers.map(u => (
             <li key={u._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '12px', background: u._id === currentUser._id ? 'rgba(255,255,255,0.05)' : 'transparent', transition: 'background 0.2s' }}>
               <div style={{ position: 'relative' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: u._id === currentUser._id ? 'var(--accent-color)' : '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', color: 'white' }}>
                   {u.username.charAt(0).toUpperCase()}
                 </div>
                 <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', border: '2px solid #1e293b' }}></div>
               </div>
               <div style={{ flex: 1, overflow: 'hidden' }}>
                 <div style={{ fontWeight: '600', fontSize: '15px', color: u._id === currentUser._id ? 'white' : 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                   {u.username}
                 </div>
                 {u._id === currentUser._id && <div style={{ fontSize: '12px', color: 'var(--accent-color)' }}>You</div>}
               </div>
             </li>
          ))}
        </ul>

        {/* User profile at bottom */}
        <div className="chat-sidebar-profile" style={{ marginTop: '16px', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{width:'44px', height:'44px', borderRadius:'50%', background:'linear-gradient(135deg, #a78bfa, #f472b6)', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold', fontSize:'16px', color:'white', boxShadow:'0 4px 10px rgba(244,114,182,0.3)'}}>{currentUser.username.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{fontWeight:'600', fontSize:'15px'}}>{currentUser.username}</div>
              <div style={{fontSize:'13px', color:'var(--success)', display:'flex', alignItems:'center', gap:'4px'}}>
                <div style={{width:'6px',height:'6px',background:'var(--success)',borderRadius:'50%'}}></div> Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main-area">
         <div className="chat-header">
           <div>
             <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>General Chat</h2>
             <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Welcome to the vibrant community</p>
           </div>
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
           </div>
         </div>

         <MessageList messages={messages} currentUserId={currentUser._id} />
         <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;
