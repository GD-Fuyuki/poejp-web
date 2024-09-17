'use server'

import { PrismaClient } from '@prisma/client';

export async function upsertUser(username: string): Promise<void> {
    const prisma = new PrismaClient();
    console.log("starting resist user")
  try {
    await prisma.user.upsert({
      where: { name: username },
      update: {}, // 既存のユーザーの場合、更新は行わない
      create: { name: username }, // 新規ユーザーの場合、nameを設定して作成
    });
    console.log(`User ${username} has been processed successfully.`);
  } catch (error) {
    console.error(`Error processing user ${username}:`, error);
  }
}