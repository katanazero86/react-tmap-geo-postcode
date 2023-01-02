import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  StyledPaginationButton,
  StyledPaginationLi,
  StyledPaginationUl,
  StyledPaginationWrap,
} from "./Pagination.styles";
import ChevronLeft from "../Icons/ChevronLeft";
import ChevronRight from "../Icons/ChevronRight";

interface PaginationProps {
  page: number;
  totalPage: number;

  onChange(page: number): void;
}

export default function Pagination({
  page,
  totalPage,
  onChange,
}: PaginationProps) {
  const [pagination, setPagination] = useState({
    block: 0,
    startPageNum: 0,
    endPageNum: 0,
  });

  const moveBeforePage = (currentPage: number) => {
    if (currentPage - 1 > 0) onChange(currentPage - 1);
  };

  const moveAfterPage = (currentPage: number) => {
    if (currentPage + 1 <= totalPage) onChange(currentPage + 1);
  };

  const handlePageClick = (targetPage: number) => {
    onChange(targetPage);
  };

  useEffect(() => {
    const block = Math.floor((page - 1) / PAGE_BLOCK_SIZE);
    const startPageNum = PAGE_BLOCK_SIZE * block + 1;
    const endPageNum =
      startPageNum + PAGE_BLOCK_SIZE - 1 > totalPage
        ? totalPage
        : startPageNum + PAGE_BLOCK_SIZE - 1;

    setPagination({
      block,
      startPageNum,
      endPageNum,
    });
  }, [page, totalPage]);

  const renderPage = () => {
    const pages = [];
    for (
      let index = pagination.startPageNum;
      index <= pagination.endPageNum;
      index++
    ) {
      pages.push(index);
    }

    return (
      <>
        {pages.map((pageValue) => (
          <StyledPaginationLi key={uuidv4()}>
            <StyledPaginationButton
              active={pageValue === page}
              onClick={() => handlePageClick(pageValue)}
            >
              {pageValue}
            </StyledPaginationButton>
          </StyledPaginationLi>
        ))}
      </>
    );
  };

  return (
    <StyledPaginationWrap>
      <StyledPaginationUl>
        <ChevronLeft onClick={() => moveBeforePage(page)} />
        {renderPage()}
        <ChevronRight onClick={() => moveAfterPage(page)} />
      </StyledPaginationUl>
    </StyledPaginationWrap>
  );
}

const PAGE_BLOCK_SIZE = 5;
