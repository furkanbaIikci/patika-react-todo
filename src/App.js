import "./App.css";

import { useState } from "react";

/* 
  todos = [{'q', compltedet: true}, {'w', compltedet: false}]
*/

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ title: "", completed: false });
  const [activeTab, setActiveTab] = useState("all");
  const [tempTodos, setTempTodos] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ title: "", completed: false });
    setTempTodos([...todos, todo]);
  };

  const changeCompletedStatus = (e) => {
    const newTodos = [...todos];
    newTodos[e].completed = !newTodos[e].completed;
    setTodos(newTodos);
  };

  const destroyButtonClick = (e) => {
    const newTodos = [...todos];
    newTodos.splice(e, 1);
    setTodos(newTodos);
  };

  const completeAll = () => {
    const newTodos = [...todos];

    if (newTodos.every((item) => item.completed === true)) {
      newTodos.forEach((item) => {
        item.completed = false;
      });
    } else {
      newTodos.forEach((item) => {
        item.completed = true;
      });
    }

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((item) => item.completed === false);
    setTodos(filteredTodos);
  };

  const showAll = () => {
    setTodos([...tempTodos]);
    setActiveTab("all");
  };

  const filterActiveTodo = () => {
    const newTodos = [...tempTodos];
    const filteredTodos = newTodos.filter((item) => item.completed === false);
    setTodos(filteredTodos);
    setActiveTab("active");
  };

  const filterCompletedTodo = () => {
    const newTodos = [...tempTodos];
    const filteredTodos = newTodos.filter((item) => item.completed === true);
    setTodos(filteredTodos);
    setActiveTab("completed");
  };
  let person={name:"Selin",city:"Ankara",favoriteColor:"aqua blue"};
let {name:foo}=person;

  return (
    <div className="App">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={formSubmit}>
            <input
              onChange={(e) =>
                setTodo({ title: e.target.value, completed: false })
              }
              value={todo.title}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>
       

        <section className="main">
          <div>
            <input
              onClick={completeAll}
              className="toggle-all"
              type="checkbox"
              id="toggle-all"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </div>
          <ul className="todo-list">
            {todos.map((todo, index) => {
              return (
                <li key={index} className={todo.completed ? "completed" : ""}>
                  <div className="view">
                    <input
                      checked={todo.completed}
                      onClick={(e) => changeCompletedStatus(index)}
                      className="toggle"
                      type="checkbox"
                    />
                    <label>{todo.title}</label>
                    <button
                      onClick={() => destroyButtonClick(index)}
                      className="destroy"
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>
              {todos.filter((item) => item.completed === false).length}{" "}
            </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                onClick={showAll}
                href="#/"
                className={activeTab === "all" ? "selected" : ""}
              >
                All
              </a>
            </li>
            <li>
              <a
                onClick={filterActiveTodo}
                className={activeTab === "active" ? "selected" : ""}
                href="#/"
              >
                Active
              </a>
            </li>
            <li>
              <a
                onClick={filterCompletedTodo}
                className={activeTab === "completed" ? "selected" : ""}
                href="#/"
              >
                Completed
              </a>
            </li>
          </ul>

          <button onClick={clearCompleted} className="clear-completed">
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
