import { NextResponse } from "next/server"
import * as fireAuth from 'firebase/auth';
import { firebaseApp, initFirebase } from "@/components/firebase/client";
import { getDate } from "@/components/getDate";
import * as firestore from 'firebase/firestore';
import { getIpAddress } from "@/components/ip-address";

export async function GET(request: Request) {
  return NextResponse.json({
    message: 200
  })
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  console.log("ログイン処理を開始します。")
  const res = await request.json() // res now contains body
  initFirebase();
  const email = res.email;
  const password = res.password;
  const [now, formattedDate] = await getDate();
  const auth = fireAuth.getAuth();
  const db = firestore.getFirestore(firebaseApp);

  let userData = null;
  await fireAuth.signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      userData = user;
      await auth.updateCurrentUser(userCredential.user);
      await firestore.setDoc(firestore.doc(db, 'log_login', `${formattedDate}_login success`), { message: 'logged in', email: email, password: password, ipAddress: await getIpAddress() });
      console.log(user);
    })
    .catch(async (error) => {
      await firestore.setDoc(firestore.doc(db, 'log_login', `${formattedDate}_login fail`), { errorStack: error.stack, errorMessage: error.message, email: email, password: password, ipAddress: await getIpAddress() });
      console.log(await error);
    });

  if (userData) {
    return NextResponse.json({
      message: 200,
      user: userData
    })
  } else {
    return NextResponse.json({
      message: 400,
      user: null
    })
  }


}