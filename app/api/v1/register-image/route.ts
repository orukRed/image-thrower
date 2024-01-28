import * as firestore from 'firebase/firestore';
export async function POST(request: Request) {
  // const res = await request.json() // res now contains body
  // // const email = res.email;
  // // const password = res.password;
  // //storageへの画像の追加を行う
  // const hoge:ThrowImage = res.image;

  // const storagePath = `images/${image.userId}_${formattedDate}`; //storageのパス
  // const s = storage.getStorage(firebaseApp);
  // const storageRef = storage.ref(s, storagePath);
  // const uploadTask = storage.uploadString(storageRef, previewSrc, 'data_url');

  // //imageのデータを作成
  // image.userId = -1; //仮値
  // image.title = name;
  // image.description = description;
  // image.filePath = (await uploadTask).ref.fullPath;
  // image.ipAddress = await getIpAddress();
  // image.createdAt = now;
  // image.updatedAt = null;
  // image.deletedAt = null;

  // //データの追加
  // await firestore.setDoc(firestore.doc(db, 'images', `${image.userId}_${formattedDate}`), image);
  // await firestore.setDoc(firestore.doc(db, 'log_image', formattedDate), { message: 'registerImage' });

  // console.log('registered');
  // return true;

}