import { create } from "zustand";

// with this package I can manage state globally. Create will return an object,  selectedConv. default is null, messages default is empty array.
// Similar to useState and set function

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
