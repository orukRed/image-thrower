'use client';

import { faPlus, faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Pagination } from '@nextui-org/react';
import page from '../changelog/page';
import { useSearchParams, redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaginationPage({ imageCount, imageLimit, currentPage }: { imageCount: number; imageLimit: number; currentPage: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (selectedPage: number) => {
    router.push(`/view?page=${selectedPage}`);
  };

  return (
    <>
      <Pagination
        showControls={true}
        total={Math.ceil(imageCount / imageLimit)}
        initialPage={currentPage}
        onChange={(value) => {
          handlePageChange(value);
        }}
      />
    </>
  );
}
