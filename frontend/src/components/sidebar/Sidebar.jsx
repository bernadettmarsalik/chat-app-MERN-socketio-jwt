import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <div className="bg-base-200 glass p-4 flex flex-col md:h-full md:rounded-l-box ">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <Logout />
    </div>
  );
};

export default Sidebar;

// STARTER
// import Conversations from "./Conversations";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
//   return (
//     <div>
//       <SearchInput />
//       <div className="divider px-3"></div>
//       <Conversations />
//       <LogoutButton />
//     </div>
//   );
// };

// export default Sidebar;
