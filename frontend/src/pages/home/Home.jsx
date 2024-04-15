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
    <div className="flex flex-col md:flex-row sm:min-w-[300px] h-[700px] justify-center rounded-lg border-4 border-slate-200">
      {/* Sidebar button */}
      <div className="z-10 sm:max-w-screen bg-slate-200 ">
        {isSidebarOpen ? (
          // Close sidebar button
          <div className="mt-auto tooltip" data-tip="Hide users">
            <button className="p-4" onClick={toggleSidebar}>
              <FiX size={24} />
            </button>{" "}
          </div>
        ) : (
          // Open sidebar button
          <div className="mt-auto tooltip" data-tip="Show users">
            <button className="p-4" onClick={toggleSidebar}>
              <FiMenu size={24} />
            </button>{" "}
          </div>
        )}
      </div>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "flex" : "hidden"} flex-col h-full `}>
        <Sidebar className="flex flex-col" />
      </div>
      {/* Message Container */}
      <MessageContainer className="flex flex-col" />
    </div>
  );
}

export default Home;
