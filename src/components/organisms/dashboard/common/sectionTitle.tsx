interface IProps {
  title?: React.ReactNode;
}

const SectionTitle: React.FC<IProps> = ({ title }) => {
  return (
    <div className="flex flex-row items-center space-x-6 h-12">
      {typeof title === "string" ? (
        <h2 className="font-bold text-3xl tracking-wide text-launchingBlue-5 dark:text-white">
          <em>{title}</em>
        </h2>
      ) : (
        title
      )}

      <span className="flex items-center flex-grow">
        <div
          className="w-0 h-0 translate-x-1 
              border-t-[8px] border-t-transparent
              border-l-[10px] border-l-launchingBlue-5 dark:border-l-white
              border-b-[8px] border-b-transparent"
        />
        <hr
          className=" h-0.5  flex-grow bg-gradient-to-r
       from-launchingBlue-5/100 to-launchingBlue-5/0 dark:from-white dark:to-launchingBlue-8 border-0 rounded md:my-10 "
        />
      </span>
    </div>
  );
};

export default SectionTitle;
