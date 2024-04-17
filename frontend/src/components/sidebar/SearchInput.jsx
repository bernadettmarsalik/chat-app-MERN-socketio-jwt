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
    <form
      onSubmit={handleSubmit}
      className="flex lg:gap-2 items-center justify-center px-5"
    >
      <input
        type="text"
        placeholder="Search user..."
        className="input-sm input-bordered  rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-sm btn-circle">
        <CiSearch className="w-6 h-6 " />
      </button>
    </form>
  );
};

export default SearchInput;
