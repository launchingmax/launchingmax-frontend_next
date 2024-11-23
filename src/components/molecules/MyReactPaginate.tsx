import { Icon } from "@iconify/react/dist/iconify.js";
import ReactPaginate from "react-paginate";

interface IProps {
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}

const MyReactPaginate: React.FC<IProps> = ({ total, pagination, setPagination }) => {
  const pageCount = Math.ceil(total / pagination.pageSize);

  const handlePageClick = (event: any) => {
    setPagination((s) => ({ ...s, pageIndex: event.selected + 1 }));
  };

  return (
    <div className=" flex justify-center items-center my-1">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="text-text-xl">
            <Icon icon="solar:alt-arrow-right-linear" />
          </span>
        }
        onPageChange={handlePageClick}
        marginPagesDisplayed={2} // Number of pages to show at the beginning and end
        pageRangeDisplayed={3} // Number of pages to show around the current page
        pageCount={pageCount}
        previousLabel={
          <span className="text-text-xl">
            <Icon icon="solar:alt-arrow-left-linear" />
          </span>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center"
        pageClassName="w-8 h-8 flex items-center justify-center rounded-sm text-launchingGray-5 dark:text-fg-white hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 focus:bg-launchingBlue-2"
        activeClassName="bg-launchingBlue-5 !text-fg-white hover:!text-fg-white"
        previousClassName="px-2 py-2 text-launchingBlue-5 rounded-sm hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 dark:text-launchingBlue-2"
        nextClassName="px-2 py-2 text-launchingBlue-5 rounded-sm hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 dark:text-launchingBlue-2"
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="w-8 h-8 flex items-center justify-center rounded-sm text-gray-600 hover:bg-launchingBlue-2 hover:text-fg-white dark:hover:bg-launchingBlue-7 "
      />
    </div>
  );
};

export default MyReactPaginate;
