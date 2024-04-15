import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IoMdChatboxes } from "react-icons/io";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline =
    selectedConversation && onlineUsers.includes(selectedConversation._id);

  // useEffect to set selected conv to null when logout when component unmounts
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  return (
    <div className="md:min-w-[500px] md:max-w-[500px]  flex flex-col bg-slate-50 overflow-scroll md:overflow-hidden ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-slate-200 px-4 py-2 mb-2 flex flex-row justify-start items-center gap-3">
            <span className="label-text">To:</span>
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <img
                  src={selectedConversation.profilePic}
                  alt="user profile picture"
                />
              </div>
            </div>
            <div>
              <div>
                <p className="font-semibold ">
                  {selectedConversation.fullName}
                </p>
              </div>
            </div>{" "}
          </div>

          {/* Messages */}
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} 👋</p>
        <p>Select a chat to start messaging</p>
        <IoMdChatboxes className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
