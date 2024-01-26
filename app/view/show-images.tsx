'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import React, { useState } from 'react';

function ImageShowModal({ image, isOpen, onClose }: { image: any; isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <div className='font-bold'>{image.title}</div>
            <div className='ml-4 text-gray-500'>{image.userId}</div>
          </ModalHeader>
          <ModalBody>
            <img src={image.url} className='w-full h-auto' />
            <div className=''>{image.description}</div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function showImages({ imageList }: { imageList: firestore.DocumentData[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const handleOpen = (image: firestore.DocumentData) => {
    setSelectedImage(image);
    onOpen();
  };
  return (
    <div className='flex flex-wrap justify-center'>
      {imageList.map((image) => {
        return (
          <div key={image.title} className='m-4 border-2 border-gray-300 rounded-lg'>
            <div className='text-center p-2'>{image.title}</div>
            <img src={image.url} className='object-cover w-64 h-64 cursor-pointer' onClick={() => handleOpen(image)} />
          </div>
        );
      })}
      <ImageShowModal image={selectedImage} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
