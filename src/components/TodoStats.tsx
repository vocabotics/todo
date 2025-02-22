import { Card, CardContent } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';

export function TodoStats() {
  const todos = useTodoStore((state) => state.todos);

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">{totalTodos}</p>
          <p className="text-muted-foreground">Total Tasks</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold">{completedTodos}</p>
          <p className="text-muted-foreground">Completed</p>
        </CardContent>
      </Card>
    </div>
  );
}
