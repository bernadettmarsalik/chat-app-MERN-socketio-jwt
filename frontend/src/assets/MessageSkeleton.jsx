const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Left-aligned message */}
      <div className="flex items-start">
        <div className="skeleton w-16 h-16 rounded-full mr-3"></div>
        <div className="flex flex-col">
          <div className="skeleton h-4 w-20 mb-1"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>

      {/* Right-aligned message */}
      <div className="flex items-start justify-end">
        <div className="flex flex-col">
          <div className="skeleton h-4 w-28 mb-1"></div>
          <div className="skeleton h-4 w-20"></div>
        </div>
        <div className="skeleton w-16 h-16 rounded-full ml-3"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
