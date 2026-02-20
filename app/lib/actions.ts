'use server'

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// 获取所有待办事项
export async function getTodos() {
  try {
    // 就像在命令行里喊话一样：从 todos 表里把内容都拿出来
    const { rows } = await sql`SELECT content FROM todos ORDER BY id DESC`;
    return rows.map(row => row.content);
  } catch (error) {
    console.error('读取数据库失败:', error);
    return [];
  }
}

// 添加待办事项
export async function addTodo(formData: FormData) {
  const todo = formData.get('todo') as string;

  if (todo) {
    try {
      // 插入一条新数据：把任务存进 todos 表的 content 列
      await sql`INSERT INTO todos (content) VALUES (${todo})`;
      
      console.log('✅ 成功存入云端数据库');
      revalidatePath('/'); // 刷新页面数据
    } catch (error) {
      console.log('❌ 存入失败:', error);
    }
  }
}