import React from "react";
import "./Message.css";
const Message = ({ data, classs }) => {
  return (
    <div className={`messageBox ${classs}`}>
      <div>
        <div className={`message-content ${classs}-msg `}>
          <p>{data.message}</p>
        </div>
        <div className={`message-meta ${classs}-meta`}>
          <p id="time">{data.time}</p>
          <p id="author">{data.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
