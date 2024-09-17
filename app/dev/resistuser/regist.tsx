import { Button } from '@/components/ui/button';
import { findUser, upsertUser } from '@/lib/actions';
import { cookies } from 'next/headers'
import { sql } from "@vercel/postgres";

const Registuser = async () => {
  const cookieStore = cookies()
  const username: any = cookieStore.get('username')?.value
  // upsertUser(username)
  // findUser(username)
  const { rows } = await sql`SELECT * FROM "User"`;
  return (
    <div className='flex flex-col gap-2'>
      <Button>Regist!</Button>
      <Button>find User!</Button>
      <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.name}
        </div>
      ))}
    </div>
    </div>
  )
}

export default Registuser