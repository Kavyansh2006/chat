function MessageList({ messages, currentUserId }) {
  return (
    <div className="message-list-container">
      {messages.map((msg) => {
        const isMe = msg.sender._id === currentUserId;

        return (
          <div key={msg._id} className={`message-bubble ${isMe ? 'sender' : 'receiver'}`}>
            {!isMe && (
              <small className="message-sender-name">
                {msg.sender.username}
              </small>
            )}
            <span className="message-content">
              {msg.content}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
