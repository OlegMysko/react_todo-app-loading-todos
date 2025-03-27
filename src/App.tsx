/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { delTodos } from './api/todos';
export const App: React.FC = () => {
  const [isInput, setIsInput] = useState('');
  const [isTodo, setTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [errorType, setErrorType] = useState<string | null>(null);

  const handleError = (type: string) => {
    setErrorType(type);
    setTimeout(() => setErrorType(null), 3000);
  };

  useEffect(() => {
    if (!USER_ID) {
      return <UserWarning />;
    }

    getTodos()
      .then(data => setTodo(Array.isArray(data) ? data : []))
      .catch(() => {
        handleError('Unable to load todos');
      })
      .finally(() => {});
  }, []);

  const getFilter = () => {
    switch (filter) {
      case 'active':
        return isTodo.filter(todo => !todo.completed);
      case 'completed':
        return isTodo.filter(todo => todo.completed);
      default:
        return isTodo;
    }
  };

  const delitePost = (todoId: number) => {
    delTodos(todoId).then(() => {
      setTodo(currentTodos =>
        Array.isArray(currentTodos)
          ? currentTodos.filter(todo => todo.id !== todoId)
          : [],
      );
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
            onClick={() => {}}
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={isInput}
              onChange={event => {
                setIsInput(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}

          {getFilter().map(tod => {
            return (
              <div
                data-cy="Todo"
                className={tod.completed ? 'todo completed' : 'todo'}
                key={tod.id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={tod.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {tod.title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    delitePost(tod.id);
                  }}
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {isTodo.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${isTodo.filter(todo => !todo.completed).length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={
                  filter === 'all' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkAll"
                onClick={() => {
                  setFilter('all');
                }}
              >
                All
              </a>

              <a
                href="#/active"
                className={
                  filter === 'active' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkActive"
                onClick={() => {
                  setFilter('active');
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={
                  filter === 'completed'
                    ? 'filter__link selected'
                    : 'filter__link'
                }
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  setFilter('completed');
                }}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={isTodo.every(tod => !tod.completed)}
              onClick={() => {}}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={
          errorType !== null
            ? 'notification is-danger is-light has-text-weight-normal '
            : 'notification is-danger is-light has-text-weight-normal hidden'
        }
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setErrorType(null);
          }}
        />
        {/* show only one message at a time */}

        {errorType}
      </div>
    </div>
  );
};
