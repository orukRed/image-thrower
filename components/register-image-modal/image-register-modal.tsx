'use client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
config.autoAddCss = false;
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea, useDisclosure } from '@nextui-org/react';
import { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useRef, useState } from 'react';
import styles from './Component.module.css';
import { firebaseApp } from '@/components/firebase/client.js';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import { getIpAddress } from '@/components/ip-address';
import { ModalSpinner } from '@/components/modal-spinner';
import { getDate } from '../getDate';

let selectedImage: string | null = null; //画像保存用の変数

interface ChildComponentProps {
  previewSrc: string | null;
  setPreviewSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

function SelectImage({ previewSrc, setPreviewSrc }: ChildComponentProps) {
  const fileInputRef: any = useRef(undefined);
  const callFileSelector = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const selectFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewSrc(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  selectedImage = previewSrc;
  if (previewSrc) {
    return (
      <>
        <div className={`${styles.checkerboard} flex justify-center items-center`} onClick={callFileSelector}>
          <input type='file' accept='.png, .jpg, .jpeg, .gif .webp' style={{ display: 'none' }} ref={fileInputRef} onChange={selectFile} />
          <img
            src={previewSrc}
            sizes='10vw'
            width={1}
            height={1}
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              maxHeight: '300px',
            }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.checkerboard} onClick={callFileSelector}>
          <input type='file' accept='.png, .jpg, .jpeg, .gif .webp' style={{ display: 'none' }} ref={fileInputRef} onChange={selectFile} />
          <div className='text-xl text-white  shadow-lg font-bold'>ファイルを選択してください</div>
          <div className='flex justify-center items-center'>
            <FontAwesomeIcon icon={faImage} size='10x' />
          </div>
        </div>
      </>
    );
  }
}

function RegisterButton({ setIsLoading, onClose, previewSrc, name, description }: { setIsLoading: Dispatch<SetStateAction<boolean>>; onClose: () => void; previewSrc: string | null; name: string | null; description: string | null }) {
  const [image, setImage] = useState<ThrowImage>({
    userId: -1,
    title: '',
    description: '',
    filePath: '',
    ipAddress: '',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    isPrivate: false,
  });

  const [now, formattedDate] = getDate();
  let db = firestore.getFirestore(firebaseApp);
  const registerImage = async (previewSrc: any) => {
    try {
      if (previewSrc === null) {
        alert('画像を選択してください');
        return;
      }
      if (name?.indexOf('/') !== -1) {
        name?.replaceAll('/', '／');
      }

      //storageへの画像の追加を行う
      const storagePath = `images/${image.userId}_${formattedDate}`; //storageのパス
      const s = storage.getStorage(firebaseApp);
      const storageRef = storage.ref(s, storagePath);
      const uploadTask = storage.uploadString(storageRef, previewSrc, 'data_url');

      //imageのデータを作成
      image.userId = -1; //仮値
      image.title = name;
      image.description = description;
      image.filePath = (await uploadTask).ref.fullPath;
      image.ipAddress = await getIpAddress();
      image.createdAt = now;
      image.updatedAt = null;
      image.deletedAt = null;

      //データの追加
      await firestore.setDoc(firestore.doc(db, 'images', `${image.userId}_${formattedDate}`), image);
      await firestore.setDoc(firestore.doc(db, 'log_image', formattedDate), { message: 'registerImage' });

      console.log('registered');
      return true;
    } catch (error) {
      if (error instanceof Error) {
        await firestore.setDoc(firestore.doc(db, 'log_image', `${formattedDate}_image`), { message: error.message, stack: error.stack });
      }
      alert(error)!;
      return false;
    }
  };

  return (
    <>
      <Button color='danger' onPress={onClose}>
        Close
      </Button>

      <Button
        color='primary'
        onClick={async () => {
          setIsLoading(true);
          const ret = await registerImage(previewSrc);
          setIsLoading(false);
          if (ret) {
            onClose();
            alert('登録しました');
          }
        }}
        disabled={!previewSrc}
        variant={previewSrc ? 'solid' : 'flat'}
      >
        Submit
      </Button>
    </>
  );
}

export default function ImageRegisterModal({ isOpen, onOpenChange, onClose }: { isOpen: boolean; onOpenChange: () => void; onClose: () => void }) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Modal size='3xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} scrollBehavior='inside'>
        <ModalContent className='w-11/12 h-11/12'>
          <ModalHeader className='flex flex-col gap-1'>image throw</ModalHeader>
          <ModalBody>
            <ModalSpinner isLoading={isLoading} />
            <SelectImage previewSrc={previewSrc} setPreviewSrc={setPreviewSrc} />
            <Input label='name' placeholder='image title' onChange={(e) => setName(e.target.value)} maxLength={50} />
            <Textarea label='description' placeholder='image description' onChange={(e) => setDescription(e.target.value)} maxRows={5} maxLength={400} />
          </ModalBody>
          <ModalFooter>
            <RegisterButton setIsLoading={setIsLoading} onClose={onClose} previewSrc={previewSrc} name={name} description={description} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
