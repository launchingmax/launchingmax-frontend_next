const PageTitle = ({
  title,
  prevPage,
}: {
  title: string;
  prevPage?: string;
}) => {
  return (
    <div className="flex m-12 h-max justify-center items-center">
      <h1 className="text-2xl font-extrabold w-max h-max mr-6">My Project</h1>
      <>
        <div
          className="w-0 h-0 translate-x-1
  border-t-[8px] border-t-transparent
  border-l-[10px] border-l-launchingBlue-5
  border-b-[8px] border-b-transparent"
        />
        <hr
          className=" h-0.5  flex-grow bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 border-0 rounded md:my-10 "
        />
      </>
    </div>
  );
};

export default PageTitle;
