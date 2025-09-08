import React from 'react';
import { User, Task, TaskStatus } from '../types';
import { Users, CheckSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface DashboardProps {
  users: User[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ users, tasks }) => {
  const taskStats = {
    total: tasks.length,
    pendente: tasks.filter(t => t.status === TaskStatus.PENDENTE).length,
    emAndamento: tasks.filter(t => t.status === TaskStatus.EM_ANDAMENTO).length,
    finalizado: tasks.filter(t => t.status === TaskStatus.FINALIZADO).length,
  };

  const recentTasks = tasks
    .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
    .slice(0, 5);

  const recentUsers = users
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema de cadastro</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Tarefas</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.pendente}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Finalizadas</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.finalizado}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tarefas Recentes</h2>
          {recentTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma tarefa cadastrada</p>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {task.status === TaskStatus.PENDENTE && <Clock className="w-4 h-4 text-yellow-500" />}
                    {task.status === TaskStatus.EM_ANDAMENTO && <AlertCircle className="w-4 h-4 text-blue-500" />}
                    {task.status === TaskStatus.FINALIZADO && <CheckCircle className="w-4 h-4 text-green-500" />}
                    <div>
                      <p className="font-medium text-gray-900">{task.nome}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(task.dataCriacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === TaskStatus.PENDENTE ? 'bg-yellow-100 text-yellow-800' :
                    task.status === TaskStatus.EM_ANDAMENTO ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usuários Recentes</h2>
          {recentUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum usuário cadastrado</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.nome}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.idade} anos</p>
                    {user.tarefas && (
                      <p className="text-xs text-gray-500">Com tarefa</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;