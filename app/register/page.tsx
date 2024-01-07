"use client";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
config.autoAddCss = false;
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LegacyRef, MutableRefObject, useRef, useState } from 'react';
import styles from './Component.module.css';

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


const SelectImage = ({ previewSrc }: any) => {
  if (previewSrc) {

  } else {
    return (
      <>
        {/* <div className='text-xl text-white bg-gray-900 shadow-lg font-bold'>
          ファイルを選択してください
        </div>
        <input type="file" accept=".png, .jpg, .jpeg, .gif .webp" style={{ display: "none" }} ref={fileInputRef} onChange={selectFile} />
        <div className='flex justify-center items-center'>
          <FontAwesomeIcon icon={faImage} size='10x' />
        </div> */}
      </>
    )
  }

  return (
    <div>
      {previewSrc}
    </div>
  )
}


export default function Page() {
  //useDisclosureで3つの戻り値返している
  //多分、onOpenはisOpenをtrueにして、onOpenChangeはトグル？
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef: any = useRef(undefined);

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

  const testFunction: any = () => {
    console.log('Button was clicked!');
    setCount(cnt => cnt + 1);
  };

  const callFileSelector = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const selectFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }



  return (
    <>
      register!!
      {/* <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}> */}
      <Modal size="4xl" isOpen={true} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">image throw</ModalHeader>
          <ModalBody>
            <div className={styles.checkerboard} onClick={callFileSelector}>
              <SelectImage previewSrc={previewSrc} />


              <div className='text-xl text-white bg-gray-900 shadow-lg font-bold'>
                ファイルを選択してください
              </div>
              <input type="file" accept=".png, .jpg, .jpeg, .gif .webp" style={{ display: "none" }} ref={fileInputRef} onChange={selectFile} />
              <div className='flex justify-center items-center'>
                <FontAwesomeIcon icon={faImage} size='10x' />
              </div>
              {previewSrc && <img src={previewSrc} alt="Preview" />}

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