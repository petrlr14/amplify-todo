import { API, graphqlOperation } from 'aws-amplify';
import { FormEvent, useEffect, useState } from 'react';
import { ListTodosQuery, Todo, listTodos, createTodo } from './graphql';

const initialState = {
  name: '',
  description: '',
};

function App() {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState<Todo[]>([]);

  async function fetchTodos() {
    try {
      const todoData = (await API.graphql(graphqlOperation(listTodos, {}))) as {
        data: ListTodosQuery;
      };
      const todo = todoData.data.listTodos?.items || [];
      setTodos(
        todo.reduce<Todo[]>((prev: Todo[], item: Todo | null): Todo[] => {
          if (item) return [...prev, item];
          return prev;
        }, [])
      );
    } catch (e) {
      console.log(e, 'error');
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const updateField = (key: keyof typeof initialState, value: string) => {
    setFormState({ ...formState, [key]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.name === '' || formState.description === '') return;
    try {
      await API.graphql(graphqlOperation(createTodo, { input: formState }));
      fetchTodos();
    } catch (e) {
      console.log(e, 'error posting');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto h-screen flex flex-col justify-start items-center ">
      <form
        className="border border-black w-full flex flex-col p-3 space-y-2"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="rounded-sm border border-black"
            onChange={({ target }) => updateField('name', target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            id="description"
            type="text"
            className="rounded-sm border border-black"
            onChange={({ target }) => updateField('description', target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-semibold text-lg"
        >
          Submit
        </button>
      </form>
      <section className="w-full h-4 py-3 space-y-3">
        {todos.map((todo) => (
          <article className="w-full p-1 border-2 border-black" key={todo.id}>
            <h2 className="text-xl font-bold">{todo.name}</h2>
            <p>{todo.description}</p>
            <span>at: {todo.createdAt}</span>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
