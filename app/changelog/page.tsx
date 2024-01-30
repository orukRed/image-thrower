interface Changelog {
  title: string;
  version: string;
  description: string[];
}

function Changelog() {
  //ここを追加するだけで、Changelogの内容が変わる
  const returnValue: Changelog[] = [
    {
      title: '2024/01/31',
      version: '0.0.2',
      description: ['無限ループの解消'],
    },
    {
      title: '2024/01/28',
      version: '0.0.1',
      description: ['ベータ版公開', '基本的なログイン機能と画像の登録、取得'],
    },
  ];

  return returnValue.map((changelog) => {
    return (
      <div key={changelog.title} className='border-b border-gray-200 py-4'>
        <div className='font-bold text-lg mb-2'>
          {changelog.title} <span className='text-sm text-gray-400 ml-4'>v{changelog.version}</span>
        </div>
        <ul className='list-disc list-inside text-gray-300'>
          {changelog.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  });
}

export default function page() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Changelog</h1>
      <div>
        <Changelog />
      </div>
    </div>
  );
}
