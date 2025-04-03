import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (message.trim() === '') return;
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/chat', { message });
            setReply(response.data.reply);
        } catch (error) {
            console.error('Error fetching response:', error);
            setReply("Oops! Something went wrong.");
        } finally {
            setLoading(false);
            setMessage(''); // Clear input after sending
        }
    };

    useEffect(() => {
        const chatContainer = document.querySelector('.chatbot-response');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [reply, loading]);

    return (
        <div className="chatbot-container position-fixed bottom-0 end-0 m-3">
            <button
                className="btn btn-primary rounded-circle"
                onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </button>
            {isOpen && (
                <div className="card chatbot-card">
                    <div className="card-header bg-primary text-white">Gemini ChatBot</div>
                    <div className="card-body d-flex flex-column">
                        <div className="chatbot-response mb-2 p-2 rounded bg-light overflow-auto" style={{ maxHeight: '50vh' }}>
                            {loading ? (
                                <div className="typing-indicator">...</div>
                            ) : (
                                reply && <p>Bot: {reply}</p>
                            )}
                        </div>
                        <div className="input-group">
                            <textarea
                                className="form-control"
                                rows="1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything..."
                            />
                            <button
                                className="btn btn-success"
                                onClick={handleSend}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
