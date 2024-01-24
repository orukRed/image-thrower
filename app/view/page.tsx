'use client';
import { useState } from 'react';
import RegisterImageModal from '../register/page';
import { Button, useDisclosure } from '@nextui-org/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';

function Images() {
  //サンプルデータ
  const [images, setImages] = useState<ThrowImage[]>([
    {
      userId: -1,
      title: '',
      description: '',
      filePath: '',
      ipAddress: '',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isPrivate: false,
    },
    {
      userId: -1,
      title: '',
      description: '',
      filePath: '',
      ipAddress: '',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isPrivate: false,
    },
  ]);

  const fetchDataFromFirestore = async () => {
    const db = firestore.getFirestore();
    const imageCollection = firestore.collection(db, 'images');

    //isPrivateがfalseのものだけ取得
    // const query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false));
    // const imageSnapshot = await firestore.getDocs(query);
    const imageSnapshot = await firestore.getDocs(imageCollection);
    const imageList = imageSnapshot.docs.map((doc) => doc.data());
    return imageList;
  };
  const fetchImagesFromStorage = async (imageList: Promise<firestore.DocumentData[]>): Promise<firestore.DocumentData[]> => {
    //iamgeListの値をコピー
    const returnList = (await imageList).slice();
    returnList.forEach(async (image) => {
      const storageRef = storage.ref(storage.getStorage(), 'images');
      const imageRefs = await storage.listAll(storageRef);
      image.url = await Promise.all(imageRefs.items.map((itemRef) => storage.getDownloadURL(itemRef))); // return imageUrls;
    });

    return returnList;
  };

  const imageList = fetchDataFromFirestore();
  fetchImagesFromStorage(imageList);
  console.log(imageList);

  // return imageList.then((images) => {
  //   return images.map((image) => {
  //     return (
  //       <div key={'id'}>
  //         <img src={image.url} />
  //         {/* <p>{image.title}</p> */}
  //       </div>
  //     );
  //   });
  // });
  return <></>;
}

export default function ViewImages() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({ defaultOpen: false });

  return (
    <>
      <div>
        <Images />

        <RegisterImageModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
        <div>
          <Button radius='full' color='primary' isIconOnly aria-label='register' onPress={onOpen} className='fixed right-0 bottom-0 m-4 w-20 h-20 md:w-24 md:h-24'>
            <FontAwesomeIcon icon={faPlus} className='text-6xl md:text-7xl' />
          </Button>
        </div>
      </div>
    </>
  );
}
