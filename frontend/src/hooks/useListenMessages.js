import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import notificationsound from "../assets/notificationsound.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  // listening to newMessage events from backend
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // apply sound from assets folder
      const notificationSound = new Audio(notificationsound);
      notificationSound.play();
      setMessages([...messages, newMessage]);
    });
    // need cleanup so does not notificate all the time:
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
