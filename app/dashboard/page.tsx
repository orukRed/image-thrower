'use client';
export default function dashboard() {
  //API呼ぶテスト
  const res = fetch('/api/v1/tenki', {
    method: 'GET',
    // headers: { 'Content-Type': 'application/json' },
  });
  console.log('------------------');
  console.log(res);
  console.log('------------------');

  return <></>;
}
