import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Raceline from '../../RaceLine/RaceLine';

const items = [<Raceline />, <Raceline />, <Raceline />];

function Items({ currentItems }) {
  return <>{currentItems && currentItems.map((item) => item)}</>;
}

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate breakLabel="..." nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={pageCount} previousLabel="< previous" renderOnZeroPageCount={null} />
    </>
  );
}

export { Items, PaginatedItems };