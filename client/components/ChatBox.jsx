

function ChatBox({ messages = [], loading }) {


  return (
    <div>
      {messages.length === 0 && !loading && (
        <p>Your answers will appear here.</p>
      )}

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.text}
          </div>
        ))}

        {loading && <div>Thinking...</div>}
      </div>
    </div>
  );
}

export default ChatBox;
