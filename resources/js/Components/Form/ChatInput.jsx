import { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSendMessage = async() => {
    if (message.trim() !== '') {
      await onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Restablecer la altura
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajustar altura
    }
  }, [message]);

  return (
    <div className="relative">
      <textarea
        className="flex h-10 w-full resize-none rounded-md bg-background pr-14 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        rows="1"
        placeholder="Escribe tu mensaje..."
        ref={textareaRef}
      />
      <button
        type="button"
        className="absolute transform -translate-y-1/2 top-5 right-4 h-[30px] w-[30px] bg-zinc-500 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center disabled:cursor-not-allowed"
        disabled={disabled}
        onClick={handleSendMessage}
      >
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-[24px] h-[24px]">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
      </button>
    </div>
  );
};

export default ChatInput;
