import { useEffect, useRef } from "react";
import MessageSkeleton from "../../assets/MessageSkeleton";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages(); //listening from incoming messages from websocket
  // console.log("messages: ", messages);
  const lastMessageRef = useRef();
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div className="px-4 flex-1 overflow-x-hidden w-full">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((index) => <MessageSkeleton key={index} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">
          Send a message and start a conversation...
        </p>
      )}
    </div>
  );
};

export default Messages;
