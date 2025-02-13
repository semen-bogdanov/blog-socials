import React, { memo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentClickPag,
  setCurrentPage,
  setCurrentClickPag,
} from '../redux/slices/filterSlice';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  fullnum: number;
  postsPerPage: number;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  fullnum,
  postsPerPage,
}) => {
  const dispatch = useDispatch<any>();

  // Количество постов на странице регулируется в Home
  const fullpage: number = fullnum / postsPerPage;
  const pages2: number = Math.round(fullpage) === fullpage ? fullpage : Math.ceil(fullpage);

  const currentPage2 = useSelector(selectCurrentClickPag);

  // В случае перехода на главную страницу автоматически переход на первую страницу
  useEffect(() => {
    if (currentPage2 === false) {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentClickPag(true));
    }
  }, [currentPage2]);

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event: any) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={postsPerPage} // количество постов на странице
      pageCount={pages2} // количество страниц
      forcePage={currentPage - 1}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
};

export const Pagination = memo(PaginationComponent);
