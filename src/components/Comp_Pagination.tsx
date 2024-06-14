import {
    Pagination,
    PaginationContent,

    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../components/ui/pagination.tsx";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationComponent({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center w-full mt-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            size="sm"
                            className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                }`}
                            onClick={() => handleClick(currentPage - 1)}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                size="sm"
                                isActive={index + 1 === currentPage}
                                onClick={() => handleClick(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            size="sm"
                            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                                }`}
                            onClick={() => handleClick(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
