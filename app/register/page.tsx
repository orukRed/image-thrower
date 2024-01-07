"use client";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
config.autoAddCss = false;
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from 'react';

interface image {
  partition: string,
  sort: number,
  created_at: Date,
  deleted_at: Date | undefined,
  description: string,
  file_path: string,
  name: string,
  user_id: number,
};

function closeModal(e: any): any {
}
function onChange() {
}


export default function Page() {
  //useDisclosureで3つの戻り値返している
  //多分、onOpenはisOpenをtrueにして、onOpenChangeはトグル？
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const testFunction: any = () => {
    console.log('Button was clicked!');
    setCount(cnt => cnt + 1);
  };
  const selectFile = (e: any) => {
    setSelectedFile(e.target.files[0]);
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [count, setCount] = useState(0);
  const [image, setImage] = useState<image>({
    partition: '',
    sort: 0,
    created_at: new Date(),
    deleted_at: undefined,
    description: '',
    file_path: '',
    name: '',
    user_id: 0,
  })



  return (
    <>
      register!!
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">image throw</ModalHeader>
          <ModalBody>
            <div className='flex justify-center items-center'>
              <input type="file" onChange={selectFile} />
              {selectedFile && <p>Selected file: {selectedFile.name}</p>}
              <FontAwesomeIcon icon={faImage} size='10x' />
            </div>
            <Input label="name" placeholder="image title" />
            <Input label="description" placeholder="image description" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary"
              onClick={() => { testFunction(); onClose(); }}
            >
              Submit
            </Button>



            <div>{count}</div>
            <div>
              <button onClick={() => setCount(cnt => cnt + 1)}>
                increment
              </button>
              <Button onClick={() => setCount(cnt => cnt - 1)}>
                decrement
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )


}