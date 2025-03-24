import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; 
    const generatePageNumbers = () => {
        let pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage > 3) pages.push(1, "...");
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...", totalPages);
        }
        return pages;
    };

    return (
        <Pagination className="justify-content-center mt-3">
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

            {generatePageNumbers().map((page, index) =>
                page === "..." ? (
                    <Pagination.Ellipsis key={index} disabled />
                ) : (
                    <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
                        {page}
                    </Pagination.Item>
                )
            )}

            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;
