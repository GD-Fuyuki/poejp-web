'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function upsertUser(username: string): Promise<void> {
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