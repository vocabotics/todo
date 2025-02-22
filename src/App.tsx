import { ThemeProvider } from '@/components/theme-provider';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { TodoStats } from '@/components/TodoStats';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-8 px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-center mb-8">Todo List</h1>
          <div className="space-y-6">
            <TodoStats />
            <TodoInput />
            <TodoList />
          </div>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}
