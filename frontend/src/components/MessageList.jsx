function MessageList({ messages, currentUserId }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingRight: '12px',
      marginBottom: '24px'
    }}>
      {messages.map((msg) => {
        const isMe = msg.sender._id === currentUserId;

        return (
          <div key={msg._id} style={{
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            backgroundColor: isMe ? 'var(--sender-msg-bg)' : 'var(--receiver-msg-bg)',
            color: 'white',
            padding: '14px 18px',
            borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            maxWidth: '75%',
            boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.2)',
            animation: isMe 
              ? 'messagePopSender 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              : 'messagePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: isMe ? 'none' : '1px solid rgba(255,255,255,0.05)'
          }}>
            {!isMe && (
              <small style={{ 
                fontWeight: '600', 
                display: 'block', 
                marginBottom: '6px', 
                fontSize: '13px', 
                color: '#a78bfa',
                letterSpacing: '0.3px'
              }}>
                {msg.sender.username}
              </small>
            )}
            <span style={{ 
              lineHeight: '1.5', 
              fontSize: '15px', 
              wordBreak: 'break-word' 
            }}>
              {msg.content}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
