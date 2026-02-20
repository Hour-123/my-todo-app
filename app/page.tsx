import { getTodos, addTodo } from './lib/actions';

export default async function TodoPage() {
  // 直接调用服务端函数获取数据！不需要 fetch，不需要 useEffect
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-green-600">全栈待办清单</h1>
      
      {/* 这里的 action 直接调用我们写好的服务端函数 */}
      <form action={addTodo} className="flex gap-2 mb-6">
        <input
          name="todo"
          type="text"
          className="border p-2 rounded text-black"
          placeholder="输入后按回车..."
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          添加
        </button>
      </form>

      <ul className="w-64">
        {todos.map((todo, index) => (
          <li key={index} className="border-b py-2 text-lg">
            ✅ {todo}
          </li>
        ))}
      </ul>
      
      <p className="mt-4 text-gray-500 text-sm italic">
        提示：现在刷新页面，数据也不会消失（除非重启服务器）
      </p>
    </div>
  );
}