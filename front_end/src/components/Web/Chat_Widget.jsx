import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiMessageDetail, BiX, BiSend } from "react-icons/bi";
import styles from "../../assets/style/components/chat_widget.module.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim()) {
      console.log("User message:", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      {/* Nút mở chat */}
      <motion.div
        className={styles.chatButton}
        onClick={toggleChat}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.5 }}
      >
        {isOpen ? <BiX size={28} /> : <BiMessageDetail size={28} />}
      </motion.div>

      {/* Khung chat */}
      {isOpen && (
        <motion.div 
          className={styles.chatBox}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className={styles.chatHeader}>Hỗ trợ khách hàng</div>
          <div className={styles.chatBody}>Xin chào! Chúng tôi có thể giúp gì cho bạn?</div>
          <div className={styles.chatFooter}>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.chatInput}
            />
            <button className={styles.sendButton} onClick={sendMessage}>
              <BiSend size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatWidget;