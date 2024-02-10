'use client';

import { faPlus, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Pagination, Spacer } from '@nextui-org/react';
import page from '../changelog/page';
import { useSearchParams, redirect, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

export default function PaginationPage({ imageCount, imageLimit, currentPage, setCurrentPage }: { imageCount: number; imageLimit: number; currentPage: number; setCurrentPage: Dispatch<SetStateAction<number>> }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (selectedPage: number) => {
    // router.push(`/view?page=${selectedPage}`);
    setCurrentPage(selectedPage);
  };

  return (
    <>
      {/* <Pagination
        showControls={true}
        total={Math.ceil(imageCount / imageLimit)}
        initialPage={currentPage}
        onChange={(value) => {
          handlePageChange(value);
        }}
      /> */}
      {/* Nextとpreviousボタン「 */}
      <div className='flex justify-center'>
        <Button
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          isDisabled={currentPage === 1}
        >
          PREVIOUS
        </Button>
        <Spacer x={4} />
        <Button
          onClick={() => {
            if (currentPage < Math.ceil(imageCount / imageLimit)) {
              handlePageChange(currentPage + 1);
            }
          }}
          isDisabled={currentPage === Math.ceil(imageCount / imageLimit)}
        >
          NEXT
        </Button>
      </div>
    </>
  );
}
