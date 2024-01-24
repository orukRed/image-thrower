
interface ThrowImage {
  userId: number;
  title: string | null;
  description: string | null;
  filePath: string;//storageへのパス
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isPrivate: boolean;
  url?: string[];//storageから取得した画像のurl
}