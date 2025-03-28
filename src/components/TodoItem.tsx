import { Todo } from '../types/Todo';
type Props = {
  tod: Todo;
  delitePost: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ tod, delitePost }) => {
  return (
    <div
      data-cy="Todo"
      className={tod.completed ? 'todo completed' : 'todo'}
      key={tod.id}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={tod.completed}
          onChange={() => {}}
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
};
