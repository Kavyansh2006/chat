import { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message General Chat..."
        style={{ 
          flexGrow: 1, 
          padding: '18px 24px', 
          borderRadius: '50px', 
          border: '1px solid var(--glass-border)',
          background: 'rgba(0,0,0,0.25)',
          fontSize: '15px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
      <button 
        type="submit" 
        style={{
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          padding: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0
        }}
        title="Send Message"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-2px' }}>
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
}

export default MessageInput;
