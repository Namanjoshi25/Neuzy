import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 mb-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-1.5 py-1.5 rounded-2xl ${
          currentPage === 1 ?  ' text-gray-500 cursor-not-allowed' : 'bg-black-900 text-white-A700 border border-black-900 '
        }`}
      >
        &lt;
      </button>
      {pageNumbers.map((number) => (
        <span
          key={number}
          className={` px-3  py-2 rounded-2xl cursor-pointer ${
            currentPage === number ? '  text-black-900 00 border-2 border-black-900 ' : 'bg-white text-black-900 border-2   border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </span>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-1.5 py-1.5 rounded-2xl ${
          currentPage === totalPages ? ' text-gray-500 cursor-not-allowed' : 'bg-black-900 text-white-A700 border border-black-900 '
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
