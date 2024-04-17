import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useConversation from "../../hooks/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search must be at least 3 characters!");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Search user..."
        className="input input-bordered rounded-full mr-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle  ">
        <CiSearch className="w-6 h-6 " />
      </button>
    </form>
  );
};

export default SearchInput;
