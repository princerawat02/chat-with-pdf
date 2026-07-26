import { useState } from "react";

import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import UploadBox from "../components/UploadBox";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto text-center pt-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Chat with your PDF</h1>
          <p>Upload a PDF and ask questions about it.</p>
        </div>

        <UploadBox />
        <ChatBox messages={messages} loading={loading} />
        <ChatInput
          setMessages={setMessages}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
