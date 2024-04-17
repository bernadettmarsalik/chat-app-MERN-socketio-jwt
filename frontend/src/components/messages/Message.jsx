import useConversation from "../../hooks/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import formatTimestamp from "../../assets/formatTimeStamp";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-teal-500" : "bg-slate-500";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="chat message" src={profilePic} />
        </div>
      </div>{" "}
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50">
        {" "}
        Sent {formatTimestamp(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
