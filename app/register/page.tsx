"use client";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
config.autoAddCss = false;
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { LegacyRef, MutableRefObject, useRef, useState } from 'react';
import styles from './Component.module.css';
import { PutItemCommand, DynamoDBClient, PutItemCommandInput } from "@aws-sdk/client-dynamodb";


interface image {
  user_id: number,
  name: string,
  description: string,
  file_path: string,
  ip_address: string,
  created_at: Date,
  updated_at: Date | undefined,
  deleted_at: Date | undefined,
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
    if (file) {
      reader.readAsDataURL(file);
    }

  };

  if (previewSrc) {
    return (
      <>
        <div className={`${styles.checkerboard} flex justify-center items-center`} onClick={callFileSelector}>
          <input type="file" accept=".png, .jpg, .jpeg, .gif .webp" style={{ display: "none" }} ref={fileInputRef} onChange={selectFile} />
          <img src={previewSrc}
            sizes='10vw'
            width={1}
            height={1}
            style={{
              width: '550px',
              height: '550px',
              objectFit: 'cover'
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


//TODO:引数でmodalの表示を切り替える用にするとよさそう
export default function Page({ isOpening }: { isOpening: boolean }) {
  isOpening = true;
  //useDisclosureで3つの戻り値返している
  //多分、onOpenはisOpenをtrueにして、onOpenChangeはトグル？
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [count, setCount] = useState(0);
  const [image, setImage] = useState<image>({
    user_id: 0,
    name: '',
    description: '',
    file_path: '',
    ip_address: '',
    created_at: new Date(),
    updated_at: undefined,
    deleted_at: undefined,
  })

  const testFunction: any = () => {
    console.log('Button was clicked!');
    setCount(cnt => cnt + 1);
  };


  const imageData: image = {
    user_id: 0,
    name: 'test',
    description: 'test',
    file_path: 'test',
    ip_address: 'test',
    created_at: new Date(),
    updated_at: undefined,
    deleted_at: undefined,
  }
  const client = new DynamoDBClient({
    region: "ap-northeast-1",
    credentials: {
      accessKeyId: "hoge",
      secretAccessKey: "foo",
    }
  });
  const data: PutItemCommandInput = {
    TableName: 'dynamodb-test',
    Item: {
      'user_id': { N: '0' }, // Number type
      'name': { S: 'test' }, // String type
      'description': { S: 'test' }, // String type
      'file_path': { S: 'test' }, // String type
      'created_at': { S: new Date().toISOString() }, // String type  
    }
  }
  const registerImage = async () => {
    console.log('registerImage');
    const command = new PutItemCommand(data);
    try {
      const result = await client.send(command);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
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
              // onClick={() => { testFunction(); registerImage(); onClose(); }}
              onClick={() => { testFunction(); registerImage(); }}
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