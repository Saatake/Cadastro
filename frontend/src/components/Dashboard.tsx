import React, { useState, useEffect } from 'react';
import { User, Task, TaskStatus } from '../types';
import { userApi, taskApi } from '../services/api';
import { Users, CheckSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, tasksResponse] = await Promise.all([
        userApi.getAll(),
        taskApi.getAll(),
      ]);
      setUsers(usersResponse.data);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTaskStats = () => {
    const pendentes = tasks.filter(task => task.status === TaskStatus.PENDENTE).length;
    const emAndamento = tasks.filter(task => task.status === TaskStatus.EM_ANDAMENTO).length;
    const finalizadas = tasks.filter(task => task.status === TaskStatus.FINALIZADO).length;
    
    return { pendentes, emAndamento, finalizadas };
  };

  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
      .slice(0, 5);
  };

  const getRecentUsers = () => {
    return users.slice(-5).reverse();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const taskStats = getTaskStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Usuários
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {users.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Tarefas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {tasks.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tarefas Pendentes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {taskStats.pendentes}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tarefas Finalizadas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {taskStats.finalizadas}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Tarefas Recentes
            </h3>
            <div className="space-y-3">
              {getRecentTasks().map((task) => (
                <div key={task.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {task.status === TaskStatus.PENDENTE && (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    {task.status === TaskStatus.EM_ANDAMENTO && (
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                    )}
                    {task.status === TaskStatus.FINALIZADO && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(task.dataCriacao)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.status === TaskStatus.PENDENTE
                        ? 'bg-yellow-100 text-yellow-800'
                        : task.status === TaskStatus.EM_ANDAMENTO
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-sm text-gray-500">Nenhuma tarefa encontrada</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Usuários Recentes
            </h3>
            <div className="space-y-3">
              {getRecentUsers().map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.nome}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-sm text-gray-500">
                      {user.idade} anos
                    </span>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-sm text-gray-500">Nenhum usuário encontrado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;