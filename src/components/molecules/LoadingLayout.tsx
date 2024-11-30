const Loading = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[calc(100vh-10rem)]">
      <div className="flex items-center justify-center ">
        <div className="flex animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 z-50"></div>
      </div>
    </div>
  );
};

export default Loading;
