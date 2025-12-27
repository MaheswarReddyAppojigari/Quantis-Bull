// import { useState, useRef, useEffect } from "react";

// function Chatbot() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization:
//               "Bearer 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",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             model: "meta-llama/llama-3.2-3b-instruct:free",
//             messages: [...messages, userMessage],
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.choices && data.choices[0]) {
//         const assistantMessage = {
//           role: "assistant",
//           content: data.choices[0].message.content,
//         };
//         setMessages((prev) => [...prev, assistantMessage]);
//       } else {
//         throw new Error("Invalid response from API");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, I encountered an error. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const clearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl h-[90vh] bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col">
//         {/* Header */}
//         <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-t-2xl border-b border-white border-opacity-20">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">AI Chatbot</h1>
//                 <p className="text-sm text-indigo-200">
//                   Powered by Quantis Bull
//                 </p>
//               </div>
//             </div>
//             {messages.length > 0 && (
//               <button
//                 onClick={clearChat}
//                 className="px-4 py-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white rounded-lg transition-all text-sm font-medium"
//               >
//                 Clear Chat
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {messages.length === 0 ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center">
//                 <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-10 h-10 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white mb-2">
//                   Start a Conversation
//                 </h2>
//                 <p className="text-indigo-200">
//                   Type a message below to begin chatting with AI
//                 </p>
//               </div>
//             </div>
//           ) : (
//             messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   message.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-2xl p-4 ${
//                     message.role === "user"
//                       ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
//                       : "bg-white bg-opacity-20 text-white"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2">
//                     {message.role === "assistant" && (
//                       <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                         <svg
//                           className="w-4 h-4 text-white"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                           />
//                         </svg>
//                       </div>
//                     )}
//                     <p className="whitespace-pre-wrap break-words">
//                       {message.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="bg-white bg-opacity-20 rounded-2xl p-4">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-2 h-2 bg-white rounded-full animate-bounce"
//                     style={{ animationDelay: "0ms" }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 bg-white rounded-full animate-bounce"
//                     style={{ animationDelay: "150ms" }}
//                   ></div>
//                   <div
//                     className="w-2 h-2 bg-white rounded-full animate-bounce"
//                     style={{ animationDelay: "300ms" }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-b-2xl border-t border-white border-opacity-20">
//           <div className="flex gap-3">
//             <textarea
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type your message here... (Press Enter to send)"
//               className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
//               rows="1"
//               disabled={loading}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!input.trim() || loading}
//               className="px-6 py-3 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               <span>Send</span>
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chatbot;
import { useState, useRef, useEffect } from "react";

function GroqChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [...messages, userMessage],
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 1,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        const assistantMessage = {
          role: "assistant",
          content: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col border border-purple-500 border-opacity-30">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-slate-900 p-6 rounded-t-2xl border-b border-purple-500 border-opacity-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Quantis Bull AI Chat</h1>
                <p className="text-sm text-purple-300">
                  Powered by MTIEAT
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="px-4 py-2 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white rounded-lg transition-all text-sm font-medium shadow-lg"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  Welcome to QUANTIS BULL AI
                </h2>
                <p className="text-purple-300 text-lg mb-4">
                  Experience lightning-fast AI responses
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <span className="px-3 py-1 bg-purple-500 bg-opacity-30 text-purple-200 rounded-full text-sm">
                    Fast responses
                  </span>
                  <span className="px-3 py-1 bg-purple-500 bg-opacity-30 text-purple-200 rounded-full text-sm">
                    Context-aware
                  </span>
                  <span className="px-3 py-1 bg-purple-500 bg-opacity-30 text-purple-200 rounded-full text-sm">
                    Helpful AI
                  </span>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white"
                      : "bg-slate-700 bg-opacity-80 text-white border border-purple-500 border-opacity-20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {message.role === "assistant" && (
                      <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap break-words leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 bg-opacity-80 rounded-2xl p-4 border border-purple-500 border-opacity-20">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-purple-900 rounded-b-2xl border-t border-purple-500 border-opacity-30">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... (Press Enter to send)"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 bg-opacity-50 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none border border-purple-500 border-opacity-30"
              rows="1"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
            >
              <span>Send</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
          </div>
          <p className="text-purple-400 text-xs mt-2 text-center">
            Powered by Quantis Bull</p>
        </div>
      </div>
    </div>
  );
}

export default GroqChatbot;