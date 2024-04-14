import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IoMdChatboxes } from "react-icons/io";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // useEffect to set selected conv to null when logout when component unmounts
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, []);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="font-bold">{selectedConversation.fullName}</span>
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
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Welcome👋 John Doe</p>
        <p>Select a chat to start messaging</p>
        <IoMdChatboxes className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
