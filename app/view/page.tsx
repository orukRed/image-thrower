'use client';
import { firebaseApp, initFirebase } from '@/components/firebase/client';
import * as firestore from 'firebase/firestore';
import * as storage from 'firebase/storage';
import ShowImages from './show-images';
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import Modals from './modals';
import * as fireAuth from 'firebase/auth';
import PaginationPage from './pagination';
import { Spacer } from '@nextui-org/react';

export default function View() {
  const fetchDataFromFirestore = (lastImage: firestore.DocumentData | null, setLastImage: Dispatch<SetStateAction<firestore.DocumentData | null>>, type: string, firstImage: any, setFirstImage: any) => {
    const db = firestore.getFirestore(firebaseApp);
    const imageCollection = firestore.collection(db, 'images');
    let query: any;
    if (lastImage !== null && firstImage !== null) {
      if (type === 'start') {
        query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'), firestore.limit(limit), firestore.startAfter(lastImage));
      } else if (type === 'end') {
        query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'), firestore.limitToLast(limit), firestore.endBefore(firstImage));
      }
    } else {
      query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'), firestore.limit(limit));
    }
    return firestore.getDocs(query).then((imageSnapshot) => {
      const imageList = imageSnapshot.docs.map((doc) => doc.data());
      setFirstImage(imageSnapshot.docs[0] as firestore.DocumentData | null);
      setLastImage(imageSnapshot.docs[imageSnapshot.docs.length - 1] as firestore.DocumentData | null);
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
  const limit = 10; //1ページに表示する画像枚数
  const [imageList, setImageList] = useState<firestore.DocumentData[]>([]);
  const [imageCount, setImageCount] = useState<number>(0);
  const [firstImage, setFirstImage] = useState<firestore.DocumentData | null>(null);
  const [lastImage, setLastImage] = useState<firestore.DocumentData | null>(null);
  // const currentPage: number = parseInt(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number>(currentPage);
  const [type, setType] = useState<string>('start');
  const auth = fireAuth.getAuth();

  useEffect(() => {
    if (previousPage < currentPage) {
      setType('start');
    } else if (currentPage < previousPage) {
      setType('end');
    }
    setPreviousPage(currentPage);
  }, [currentPage]);
  useEffect(() => {
    const unsubscribe = fireAuth.onAuthStateChanged(auth, (user: any) => {
      if (user) {
        fetchDataFromFirestore(lastImage, setLastImage, type, firstImage, setFirstImage).then((imageList: any) => {
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
  }, [previousPage]);
  if (imageList.length === 0) {
    {
    }
    return <></>;
  }

  return (
    <>
      <ShowImages imageList={imageList} />

      <div className='flex justify-center'>
        <PaginationPage imageCount={imageCount} imageLimit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <Spacer y={32} />
      <Modals />
    </>
  );
}
