import { Button } from '@/components/ui/button';
import { findUser, upsertUser } from '@/lib/actions';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers'


const prisma = new PrismaClient();

// async function upsertUser(username: string): Promise<void> {
//   try {
//     await prisma.user.upsert({
//       where: { name: username },
//       update: {}, // 既存のユーザーの場合、更新は行わない
//       create: { name: username }, // 新規ユーザーの場合、nameを設定して作成
//     });
//     console.log(`User ${username} has been processed successfully.`);
//   } catch (error) {
//     console.error(`Error processing user ${username}:`, error);
//   }
// }
const Registuser = () => {
  const cookieStore = cookies()
  const username: any = cookieStore.get('username')?.value
  upsertUser(username)
  findUser(username)

  return (
    <div className='flex flex-col gap-2'>
      <Button>Regist!</Button>
      <Button>find User!</Button>
      
    </div>
  )
}

export default Registuser