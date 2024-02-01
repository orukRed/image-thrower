'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import React, { useState } from 'react';
import NextImage from 'next/image';
import Image from 'next/image';

function ImageShowModal({ image, isOpen, onClose }: { image: any; isOpen: boolean; onClose: () => void }) {
  console.log(image.createdAt.toDate());
  const date = image.createdAt.toDate();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const timestamp = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' className=''>
        <ModalContent>
          <ModalHeader>
            <div className='font-bold'>{image.title}</div>
            <div className='ml-4 text-gray-500'>{timestamp}</div>
          </ModalHeader>
          <ModalBody className=''>
            <img src={image.url} className='max-w-[80vh] h-auto' />
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

export default function ShowImages({ imageList }: { imageList: firestore.DocumentData[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const handleOpen = (image: firestore.DocumentData) => {
    setSelectedImage(image);
    onOpen();
  };
  //imageListが空なら<></>を返却
  if (!imageList || imageList.length === 0) {
    return <></>;
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {imageList.map((image, index) => {
        return (
          <div key={index} className='m-4 border-2 border-gray-300 rounded-lg'>
            <div className='text-center p-2'>{image.title}</div>
            <img src={image.url} className='object-cover w-64 h-64 cursor-pointer' onClick={() => handleOpen(image)} />
          </div>
        );
      })}
      <ImageShowModal image={selectedImage} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
