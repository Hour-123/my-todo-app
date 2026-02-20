'use server'
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  try {
    // 获取整行数据，这样我们就有 id 了
    const { rows } = await sql`SELECT * FROM todos ORDER BY id DESC`;
    return rows; 
  } catch (error) {
    console.error('读取数据库失败:', error);
    return [];
  }
}

export async function addTodo(formData: FormData) {
  const todo = formData.get('todo') as string;
  if (todo) {
    await sql`INSERT INTO todos (content) VALUES (${todo})`;
    revalidatePath('/'); // 刷新缓存，让页面看到新数据
  }
}

// 新增：删除功能
export async function deleteTodo(id: number) {
  await sql`DELETE FROM todos WHERE id = ${id}`;
  revalidatePath('/');
}