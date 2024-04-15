import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu and close from react-icons

import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Set the initial state of the sidebar based on screen size

  // Update sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Sidebar is open on medium screens and above
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-auto md:min-h-[600px] md:max-h-[700px] justify-center rounded-lg">
      {/* Sidebar button */}
      <div className="sticky top-0 bg-slate-300 z-10">
        {isSidebarOpen ? (
          // Close sidebar button
          <button className="p-4" onClick={toggleSidebar}>
            <FiX size={24} />
          </button>
        ) : (
          // Open sidebar button
          <button className="p-4" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
        )}
      </div>
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "flex" : "hidden"} sticky top-0  z-10`}
      >
        <Sidebar />
      </div>
      {/* Message Container */}
      <div className="flex">
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
