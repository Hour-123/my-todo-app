'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  try {
    // 拿到所有列：id, content, completed
    const { rows } = await sql`SELECT * FROM todos ORDER BY id DESC`;
    return rows; 
  } catch (error) {
    console.error('读取失败:', error);
    return [];
  }
}

export async function addTodo(formData: FormData) {
  const todo = formData.get('todo') as string;
  if (todo) {
    await sql`INSERT INTO todos (content) VALUES (${todo})`;
    revalidatePath('/');
  }
}

// 新增：删除功能
export async function deleteTodo(id: number) {
  await sql`DELETE FROM todos WHERE id = ${id}`;
  revalidatePath('/');
}

// 新增：切换完成状态
export async function toggleTodo(id: number, currentStatus: boolean) {
  await sql`UPDATE todos SET completed = ${!currentStatus} WHERE id = ${id}`;
  revalidatePath('/');
}