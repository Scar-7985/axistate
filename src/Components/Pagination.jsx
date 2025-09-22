const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getPages = () => {
        const pages = [];
        const maxVisible = 5; // how many numbers to show around current page

        if (totalPages <= maxVisible) {
            // show all if few pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // always show first page
            pages.push(1);

            // add "..." before current block
            if (currentPage > 3) {
                pages.push("...");
            }

            // pages around current page
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            // add "..." after current block
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div id="local-pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page, idx) =>
                page === "..." ? (
                    <span key={idx} className="dots">...</span>
                ) : (
                    <button
                        key={page}
                        className={page === currentPage ? "active" : ""}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;