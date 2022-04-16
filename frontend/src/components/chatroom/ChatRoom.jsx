import React, { useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./ChatRoom.css";
import Message from "../message/Message";
import { Send } from "@mui/icons-material";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
const ENDPOINT = "http://localhost:4000/";
let socket;

const ChatRoom = () => {
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const [username, setUsername] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit(`send_message`, { messageData });
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: [`websocket`] });

    socket.on(`connect`, () => {
      alert.success(`Happy chating`);
      setUsername(user.name);
    });
    socket.emit(`joined`, user.name);

    socket.on(`userjoined`, (data) => {
      setMessages((list) => [...list, data]);
    });

    socket.on(`wellcome`, (data) => {
      setMessages((list) => [...list, data]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on(`receive_message`, (data) => {
      setMessages((list) => [...list, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatContainer">
      <ReactScrollToBottom className="chatBox">
        {messages.map((item, index) => (
          <Message
            key={index}
            data={item.messageData}
            classs={username === item.messageData.author ? `right` : `left`}
          />
        ))}
      </ReactScrollToBottom>
      <div className="inputBox">
        <input
          type="text"
          id="chatInput"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage} className="sendBtn">
          <Send />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
