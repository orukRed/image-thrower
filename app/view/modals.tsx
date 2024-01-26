'use client';
import ImageRegisterModal from '@/components/register-image-modal/image-register-modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, useDisclosure } from '@nextui-org/react';

export default function Modals() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({ defaultOpen: false });

  return (
    <>
      <ImageRegisterModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      <div>
        <Button radius='full' color='primary' isIconOnly aria-label='register' onPress={onOpen} className='fixed right-0 bottom-0 m-4 w-20 h-20 md:w-24 md:h-24'>
          <FontAwesomeIcon icon={faPlus} className='text-6xl md:text-7xl' />
        </Button>
      </div>
    </>
  );
}
