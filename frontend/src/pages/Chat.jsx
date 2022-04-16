import React from "react";
import ChatRoom from "../components/chatroom/ChatRoom";

const Chat = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2>Chat Room</h2>
          <div className="card">
            <ChatRoom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
