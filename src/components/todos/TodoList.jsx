// components/todos/TodoList.jsx
import TodoCard from "./TodoCard";

const TodoList = ({ todos = [] }) => {
  if (!todos.length)
    return (
      <div className="text-center text-gray-500 py-8">
        No todos found.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id || todo.title} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
