import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { User, Task } from './types';
import { userApi, taskApi } from './services/api';

type CurrentPage = 'home' | 'users' | 'tasks';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  // Load data on component mount
  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      alert('Erro ao carregar usuários. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      alert('Erro ao carregar tarefas. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  // User operations
  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      setLoading(true);
      await userApi.create(userData);
      await loadUsers();
      setShowUserForm(false);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao cadastrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userData: Omit<User, 'id'>) => {
    if (!editingUser?.id) return;
    
    try {
      setLoading(true);
      await userApi.update(editingUser.id, userData);
      await loadUsers();
      setShowUserForm(false);
      setEditingUser(undefined);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      setLoading(true);
      await userApi.delete(id);
      await loadUsers();
      alert('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    } finally {
      setLoading(false);
    }
  };

  // Task operations
  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      await taskApi.create(taskData);
      await loadTasks();
      setShowTaskForm(false);
      alert('Tarefa cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao cadastrar tarefa.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id'>) => {
    if (!editingTask?.id) return;
    
    try {
      setLoading(true);
      await taskApi.update(editingTask.id, taskData);
      await loadTasks();
      setShowTaskForm(false);
      setEditingTask(undefined);
      alert('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    try {
      setLoading(true);
      await taskApi.delete(id);
      await loadTasks();
      alert('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelUserForm = () => {
    setShowUserForm(false);
    setEditingUser(undefined);
  };

  const handleCancelTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(undefined);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard users={users} tasks={tasks} />;
      
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
                <p className="text-gray-600 mt-2">Gerencie os usuários do sistema</p>
              </div>
              <button
                onClick={() => setShowUserForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Usuário</span>
              </button>
            </div>
            <UserList
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              isLoading={loading}
            />
          </div>
        );
      
      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
                <p className="text-gray-600 mt-2">Gerencie as tarefas do sistema</p>
              </div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Tarefa</span>
              </button>
            </div>
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              isLoading={loading}
            />
          </div>
        );
      
      default:
        return <Dashboard users={users} tasks={tasks} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPageContent()}
      
      {/* User Form Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          tasks={tasks}
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          onCancel={handleCancelUserForm}
          isLoading={loading}
        />
      )}
      
      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          users={users}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelTaskForm}
          isLoading={loading}
        />
      )}
    </Layout>
  );
}

export default App;