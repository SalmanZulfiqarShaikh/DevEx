import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Send, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const socket = io('http://localhost:3000', { withCredentials: true, autoConnect: false });

const Chat = () => {
  const { user } = useAuth();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(location.state?.sellerId ? { _id: location.state.sellerId, name: location.state.sellerName || "Seller", profilePic: location.state.sellerProfilePic } : null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to Socket
  useEffect(() => {
    if (user?._id || user?.id) {
      const uId = user._id || user.id;
      socket.connect();
      socket.emit('join', uId);

      socket.on('receiveMessage', (message) => {
        // If the message is from the currently selected user, add it to chat
        if (selectedContact && (message.senderId === selectedContact._id || message.receiverId === selectedContact._id)) {
          setMessages((prev) => [...prev, message]);
        }
        // Refresh contacts to update order
        fetchContacts();
      });

      socket.on('messageSent', (message) => {
        setMessages((prev) => [...prev, message]);
        fetchContacts();
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('messageSent');
        socket.disconnect();
      };
    }
  }, [user, selectedContact]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/chat/contacts', { withCredentials: true });
      setContacts(res.data);
      
      // If we came from a "Chat with Seller" but they aren't in contacts yet, add them temporarily
      if (location.state?.sellerId && !res.data.find(c => c._id === location.state.sellerId)) {
        setContacts(prev => [{ _id: location.state.sellerId, name: location.state.sellerName || "Seller", role: "seller" }, ...prev]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const fetchHistory = async (otherUserId) => {
    try {
      const res = await axios.get(`http://localhost:3000/chat/history/${otherUserId}`, { withCredentials: true });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact?._id) {
      fetchHistory(selectedContact._id);
    }
  }, [selectedContact]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact?._id) return;

    const uId = user._id || user.id;
    const msgPayload = {
      senderId: uId,
      receiverId: selectedContact._id,
      text: newMessage.trim()
    };

    try {
      // 1. Persist to DB
      const res = await axios.post('http://localhost:3000/chat/message', {
        receiverId: selectedContact._id,
        text: newMessage.trim()
      }, { withCredentials: true });

      // 2. Emit Socket for live update
      socket.emit('sendMessage', msgPayload);

      // 3. Local view update
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
      fetchContacts();
    } catch (error) {
      console.error("Failed to send message REST fallback:", error);
    }
  };

  return (
    <div className="h-screen bg-[var(--bg)] flex border-l border-[var(--border)]">
      {/* Contacts List */}
      <div className="w-80 border-r border-[var(--border)] flex flex-col bg-[var(--accent-bg)]">
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)] font-bold text-[var(--text-h)] text-sm tracking-widest uppercase">
          Messages
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
              <MessageSquare size={24} className="opacity-30" />
              No conversations yet.
            </div>
          ) : (
            contacts.map((contact) => {
              const isSelected = selectedContact?._id === contact._id;
              return (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full px-6 py-4 flex items-center gap-3 border-b border-[var(--border)] transition-colors text-left ${
                    isSelected ? 'bg-white/[0.03] border-l-2 border-l-[var(--accent)]' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] font-bold overflow-hidden flex-shrink-0">
                    {contact.profilePic ? (
                      <img src={contact.profilePic.startsWith('http') ? contact.profilePic : `http://localhost:3000${contact.profilePic}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      contact.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[var(--text-h)] truncate">{contact.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{contact.role}</span>
                  </div>
                  {contact.unreadCount > 0 && !isSelected && (
                    <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md flex-shrink-0 animate-pulse">
                      {contact.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="h-16 flex items-center px-8 border-b border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] font-bold text-sm overflow-hidden">
                  {selectedContact.profilePic ? (
                    <img src={selectedContact.profilePic} alt="" className="w-full h-full object-cover" />
                  ) : (
                    selectedContact.name?.charAt(0) || 'U'
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-h)]">{selectedContact.name}</h3>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedContact.role || 'Chat Partner'}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-black/10 flex flex-col">
              {messages.map((msg, i) => {
                const isMine = String(msg.senderId) === String(user._id || user.id);
                return (
                  <div key={msg._id || i} className={`flex items-end gap-2 max-w-[75%] ${isMine ? 'self-end flex-row-reverse' : 'self-start'}`}>
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--accent)] overflow-hidden flex-shrink-0">
                      {isMine ? (
                        user?.profilePic ? (
                          <img src={user.profilePic.startsWith('http') ? user.profilePic : `http://localhost:3000${user.profilePic}`} alt="" className="w-full h-full object-cover" />
                        ) : (
                          user?.name?.charAt(0) || 'Me'
                        )
                      ) : (
                        selectedContact?.profilePic ? (
                          <img src={selectedContact.profilePic.startsWith('http') ? selectedContact.profilePic : `http://localhost:3000${selectedContact.profilePic}`} alt="" className="w-full h-full object-cover" />
                        ) : (
                          selectedContact?.name?.charAt(0) || 'U'
                        )
                      )}
                    </div>
                    <div className={`max-w-xs md:max-w-md p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isMine 
                      ? 'bg-[var(--accent)] text-[var(--bg)] font-medium rounded-br-none shadow-lg' 
                      : 'bg-[var(--accent-bg)] text-[var(--text-h)] border border-[var(--border)] rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border)] bg-[var(--bg)] flex gap-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${selectedContact.name}...`}
                className="flex-1 bg-[var(--accent-bg)] border border-[var(--border)] rounded-xl px-4 text-sm text-[var(--text-h)] font-medium focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
              <button 
                type="submit"
                className="w-12 h-12 bg-[var(--accent)] text-[var(--bg)] rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-2">
            <MessageSquare size={32} className="opacity-30" />
            <p className="text-sm">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
