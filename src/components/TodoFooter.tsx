import { Todo } from '../types/Todo';

type Props = {
  filter: string;
  setFilter: (filter: string) => void;
  isTodo: Todo[];
};

export const TodoFooter: React.FC<Props> = ({ filter, setFilter, isTodo }) => {
  return (
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
            filter === 'completed' ? 'filter__link selected' : 'filter__link'
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
  );
};
