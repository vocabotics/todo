import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useTodoStore } from '@/store/todoStore';
import { format } from 'date-fns';
import { FiTrash2 } from 'react-icons/fi';

export function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex items-center justify-between p-4 bg-card rounded-lg shadow">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <div>
                <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.title}
                </p>
                <span className="text-xs text-muted-foreground">
                  {format(todo.createdAt, 'PPp')}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="text-destructive">
              <FiTrash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
