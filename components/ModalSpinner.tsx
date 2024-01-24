import { Spinner } from '@nextui-org/react';

export function ModalSpinner({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-white opacity-75'></div>
          <div className='relative z-10'>
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
}
