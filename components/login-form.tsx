'use client';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import * as fireAuth from 'firebase/auth';
import { firebaseApp, initFirebase } from '@/components/firebase/client';
import { redirect, useRouter } from 'next/navigation';
import * as firestore from 'firebase/firestore';
import { getDate } from './getDate';
import { getIpAddress } from './ip-address';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { ModalSpinner } from './modal-spinner';

export default function LoginForm({}: {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //ログインパスワードとemailが一致してログイン処理中のフラグ
  const [isAuthing, setIsAuthing] = useState(false);

  const router = useRouter();

  const authenticationUser = async (email: string, password: string) => {
    console.log('email:' + email);
    console.log('password:' + password);
    const [now, formattedDate] = getDate();

    const db = firestore.getFirestore(firebaseApp);
    const auth = fireAuth.getAuth(); //初期化処理
    await setPersistence(auth, browserSessionPersistence);
    await fireAuth.setPersistence(auth, fireAuth.browserLocalPersistence);
    setIsAuthing(true);

    try {
      const userCredential = await fireAuth.signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      await firestore.setDoc(firestore.doc(db, 'log_login', `${formattedDate}_login success`), { message: 'logged in', email: email, password: password, ipAddress: await getIpAddress() });
      await auth.updateCurrentUser(userCredential.user);
      router.push('/view');
    } catch (error) {
      if (error instanceof Error) {
        await firestore.setDoc(firestore.doc(db, 'log_login', `${formattedDate}_login fail`), { errorStack: error.stack, errorMessage: error.message, email: email, password: password, ipAddress: await getIpAddress() });
        setIsAuthing(false);
        alert('パスワードが違うよ');
      }
    }
  };
  initFirebase();

  return (
    <div className=' flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <input type='hidden' name='id' value='userId' />
        <Input name='email' className='mt-1 block w-full py-2 px-3   rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' type='email' label='Email' onChange={(e) => setEmail(e.target.value)} />
        <Input name='password' className='mt-1 block w-full py-2 px-3    rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
        <Button
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={async () => {
            await authenticationUser(email, password);
          }}
          type='submit'
        >
          Login
        </Button>
      </div>
      <ModalSpinner isLoading={isAuthing} />
    </div>
  );
}
