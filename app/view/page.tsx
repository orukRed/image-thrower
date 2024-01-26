import { initFirebase } from '@/components/firebase/client';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import ShowImages from './show-images';
import { useEffect, useState } from 'react';
import ImageRegisterModal from '@/components/register-image-modal/image-register-modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, useDisclosure } from '@nextui-org/react';
import openModal from './modals';
import Modals from './modals';

export default async function view() {
  initFirebase();
  const fetchDataFromFirestore = async () => {
    const db = firestore.getFirestore();
    const imageCollection = firestore.collection(db, 'images');
    const imageSnapshot = await firestore.getDocs(imageCollection);
    const imageList = imageSnapshot.docs.map((doc) => doc.data());
    return imageList;
  };
  const fetchImagesFromStorage = async (imageList: firestore.DocumentData[]): Promise<firestore.DocumentData[]> => {
    const returnList = imageList.slice();
    for (const image of returnList) {
      const storageRef = storage.ref(storage.getStorage(), image.filePath);
      image.url = await storage.getDownloadURL(storageRef);
    }
    return returnList;
  };

  const imageList = await fetchDataFromFirestore();
  const updatedImageList = await fetchImagesFromStorage(imageList);

  return (
    <>
      <ShowImages imageList={updatedImageList} />
      <Modals />
    </>
  );
}
