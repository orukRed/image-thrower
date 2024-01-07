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




const SelectImage = ({ hoge }: any) => {

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef: any = useRef(undefined);
  const callFileSelector = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const selectFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewSrc(reader.result);
      }
    }
    reader.readAsDataURL(file);
  };

  if (previewSrc) {
    return (
      <>
        <div className={`${styles.checkerboard} flex justify-center items-center`} onClick={callFileSelector}>
          <input type="file" accept=".png, .jpg, .jpeg, .gif .webp" style={{ display: "none" }} ref={fileInputRef} onChange={selectFile} />
          <img src={previewSrc}
            sizes='100vw'
            width={1}
            height={1}
            style={{
              width: 'auto',
              height: 'auto',
            }} />
        </div >
      </>
    )
  } else {
    return (
      <>
        <div className={styles.checkerboard} onClick={callFileSelector}>
          <input type="file" accept=".png, .jpg, .jpeg, .gif .webp" style={{ display: "none" }} ref={fileInputRef} onChange={selectFile} />
          <div className='text-xl text-white bg-gray-900 shadow-lg font-bold'>
            ファイルを選択してください
          </div>
          <div className='flex justify-center items-center'>
            <FontAwesomeIcon icon={faImage} size='10x' />
          </div>
        </div>
      </>
    )
  }

}


export default function Page() {

  //useDisclosureで3つの戻り値返している
  //多分、onOpenはisOpenをtrueにして、onOpenChangeはトグル？
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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

  const registerImage = () => {
    console.log('registerImage');
    console.log(image);
  }


  return (
    <>
      register!!
      {/* <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}> */}
      <Modal size="4xl" isOpen={true} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">image throw</ModalHeader>
          <ModalBody>
            <SelectImage />
            <Input label="name" placeholder="image title" />
            <Input label="description" placeholder="image description" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary"
              onClick={() => { testFunction(); registerImage(); onClose(); }}
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