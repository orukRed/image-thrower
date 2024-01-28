import { firebaseApp, initFirebase } from '@/components/firebase/client';
import LoginForm from '@/components/login-form';
import * as fireAuth from 'firebase/auth';
import { redirect } from 'next/navigation';
import * as firestore from 'firebase/firestore';
import { getIpAddress } from '@/components/ip-address';
import router from 'next/router';
import Head from 'next/head';

export default async function Login() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>Sign in to your account</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
