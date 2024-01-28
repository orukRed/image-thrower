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
import { redirect } from 'next/navigation';

export default function View() {
  const fetchDataFromFirestore = () => {
    const db = firestore.getFirestore(firebaseApp);
    const imageCollection = firestore.collection(db, 'images');
    const query = firestore.query(imageCollection, firestore.where('isPrivate', '==', false), firestore.orderBy('createdAt', 'desc'), firestore.limit(500));

    return firestore.getDocs(query).then((imageSnapshot) => {
      const imageList = imageSnapshot.docs.map((doc) => doc.data());
      return imageList;
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
  const [imageList, setImageList] = useState<firestore.DocumentData[]>([]);
  const [user, setUser] = useState(null);
  const auth = fireAuth.getAuth();

  useEffect(() => {
    const unsubscribe = fireAuth.onAuthStateChanged(auth, (user: any) => {
      setUser(user);
      if (user) {
        fetchDataFromFirestore().then((imageList) => {
          fetchImagesFromStorage(imageList)
            .then((updatedImageList) => {
              setImageList(updatedImageList);
            })
            .catch((error) => {
              console.log('NO LOGIN');
              redirect('/login');
            });
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [imageList]);

  if (imageList.length === 0) {
    return (
      <>
        <Modals />
      </>
    );
  } else {
    return (
      <>
        <ShowImages imageList={imageList} />
        <Modals />
      </>
    );
  }
}
