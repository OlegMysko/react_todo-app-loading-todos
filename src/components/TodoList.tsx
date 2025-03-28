import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
type Props = {
  getFilter: () => Todo[];
  delitePost: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ getFilter, delitePost }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}

      {getFilter().map(tod => {
        return <TodoItem delitePost={delitePost} tod={tod} key={tod.id} />;
      })}
    </section>
  );
};
