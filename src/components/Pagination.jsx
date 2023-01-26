import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="text-gray-900 flex w-full items-center justify-center gap-2">
      <a
        className={`cursor-pointer ${pageNumbers.length === 0 && "hidden"}`}
        onClick={() => prevPage()}
      >
        {"<<"}
      </a>
      {pageNumbers.map((i) => (
        <div
          key={i}
          className={`${
            currentPage === i
              ? "text-[#FF0060] bg-white border-[#FF0060]"
              : "bg-[#FF0060] text-white border-[#DFDFDF]"
          } rounded-full  w-[2.1em] h-[2.1em] flex items-center justify-center border  cursor-pointer `}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      ))}
      <a
        className={`cursor-pointer ${pageNumbers.length === 0 && "hidden"}`}
        onClick={() => nextPage()}
      >
        {">>"}
      </a>
    </div>
  );
};

export default Pagination;
