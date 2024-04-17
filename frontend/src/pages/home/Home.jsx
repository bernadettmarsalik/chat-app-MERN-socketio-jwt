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
      <div className="flex flex-col h-4/5 w-screen md:flex-row md:w-5/6 lg:w-6/12 justify-center md:rounded-box md:border-4 md:border-base-100">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "flex" : "hidden"
          } flex-col w-screen md:w-1/3  `}
        >
          <Sidebar className="flex flex-col " />
        </div>
        {/* Message Container */}
        <MessageContainer />
      </div>
    </>
  );
}

export default Home;
