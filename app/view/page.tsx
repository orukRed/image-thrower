'use client';
import { firebaseApp, initFirebase } from '@/components/firebase/client';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import ShowImages from './show-images';
import { use, useEffect, useState } from 'react';
import ImageRegisterModal from '@/components/register-image-modal/image-register-modal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, image, useDisclosure } from '@nextui-org/react';
import openModal from './modals';
import Modals from './modals';
import * as fireAuth from 'firebase/auth';
import { redirect, useSearchParams } from 'next/navigation';
import PaginationPage from './pagination';

export default function View() {
  const fetchDataFromFirestore = () => {
    const db = firestore.getFirestore(firebaseApp);
    const imageCollection = firestore.collection(db, 'images');
    const query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'), firestore.limit(limit));

    return firestore.getDocs(query).then((imageSnapshot) => {
      const imageList = imageSnapshot.docs.map((doc) => doc.data());
      return imageList;
    });
  };
  const fetchDataCountFromFirestore = () => {
    const db = firestore.getFirestore(firebaseApp);
    const imageCollection = firestore.collection(db, 'images');
    const query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'));
    return firestore.getCountFromServer(query).then((count) => {
      return count.data().count;
    });
  };
  const fetchImagesFromStorage = (imageList: firestore.DocumentData[]): Promise<firestore.DocumentData[]> => {
    const returnList = imageList.slice();
    const promises = returnList.map((image) => {
      const storageRef = storage.ref(storage.getStorage(), image.filePath);
      return storage.getDownloadURL(storageRef).then((url) => {
        image.url = url;
      });
    });
    return Promise.all(promises).then(() => returnList);
  };

  initFirebase();
  const limit = 20; //1ページに表示する画像枚数
  const [imageList, setImageList] = useState<firestore.DocumentData[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const searchParams = useSearchParams();
  const currentPage: number = parseInt(searchParams.get('page') || '1');
  const auth = fireAuth.getAuth();

  useEffect(() => {
    const unsubscribe = fireAuth.onAuthStateChanged(auth, (user: any) => {
      if (user) {
        fetchDataFromFirestore().then((imageList) => {
          fetchImagesFromStorage(imageList).then((updatedImageList) => {
            setImageList(updatedImageList);
          });
        });
        fetchDataCountFromFirestore().then((count) => {
          setImageCount(count);
        });
      }
    });
    return () => unsubscribe();
  }, []);
  if (imageList.length === 0) {
    {
    }
    return <></>;
  }

  return (
    <>
      <ShowImages imageList={imageList} />
      <div className='flex justify-center'>
        <PaginationPage imageCount={imageCount} imageLimit={limit} currentPage={currentPage} />
      </div>
      <Modals />
    </>
  );
}
