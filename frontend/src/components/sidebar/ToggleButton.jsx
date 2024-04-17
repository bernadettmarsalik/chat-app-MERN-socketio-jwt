import { FiMenu, FiX } from "react-icons/fi";

function ToggleButton({ isSidebarOpen, toggleSidebar }) {
  return (
    <div
      className="mt-auto tooltip"
      data-tip={isSidebarOpen ? "Hide users" : "Show users"}
    >
      <button className="p-4" onClick={toggleSidebar}>
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>{" "}
    </div>
  );
}

export default ToggleButton;
