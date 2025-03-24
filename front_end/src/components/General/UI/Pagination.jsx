import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={`pagination-button ${page === currentPage ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
export default Pagination;