import { useState, useEffect } from "react";
import ToggleButton from "../../components/sidebar/ToggleButton";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar button */}
      <div className="z-10 bg-transparent">
        <ToggleButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="flex flex-col md:h-4/5 w-screen md:flex-row md:w-5/6 lg:w-6/12 justify-center md:rounded-box md:border-4 md:border-base-100 shadow-lg">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "flex" : "hidden"
          } flex-col w-screen  h-1/3 sm:h-full md:w-1/2 overflow-y-auto overflow-x-hidden `}
        >
          <Sidebar className="flex flex-col" />
        </div>
        {/* Message Container */}
        <MessageContainer className={isSidebarOpen ? "w-full" : ""} />
      </div>
    </>
  );
}

export default Home;
