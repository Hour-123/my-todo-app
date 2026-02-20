import { getTodos, addTodo, deleteTodo } from './lib/actions';

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center p-10 font-sans max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600 font-bold">全栈待办清单</h1>
      
      <form action={addTodo} className="flex gap-2 mb-8 w-full">
        <input name="todo" className="border p-2 rounded flex-1 text-black" placeholder="添加任务..." required />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">添加</button>
      </form>

      <ul className="w-full space-y-3">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-3 border rounded bg-white shadow-sm">
            <span className="text-gray-800">{todo.content}</span>
            <form action={deleteTodo.bind(null, todo.id)}>
              <button className="text-red-400 hover:text-red-600 text-sm">删除</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}