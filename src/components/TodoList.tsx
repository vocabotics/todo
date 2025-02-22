import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTodoStore } from '@/store/todoStore';
import { format } from 'date-fns';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { toast } from 'sonner';

export function TodoList() {
  const { todos, toggleTodo, deleteTodo, updateTodoTitle } = useTodoStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditStart = (todo: { id: string; title: string }) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleEditSave = (id: string) => {
    if (!editTitle.trim()) {
      toast.error('Todo title cannot be empty');
      return;
    }
    updateTodoTitle(id, editTitle.trim());
    setEditingId(null);
    setEditTitle('');
    toast.success('Todo updated successfully');
  };

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
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <div className="flex-1">
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
                      className="flex-1"
                    />
                    <Button onClick={() => handleEditSave(todo.id)}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <>
                    <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {format(todo.createdAt, 'PPp')}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {!editingId && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditStart(todo)}
                  className="text-primary">
                  <FiEdit2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="text-destructive">
                <FiTrash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}