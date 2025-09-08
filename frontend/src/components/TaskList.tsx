import React from 'react';
import { Task, TaskStatus } from '../types';
import { Edit, Trash2, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, isLoading }) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case TaskStatus.EM_ANDAMENTO:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case TaskStatus.FINALIZADO:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDENTE:
        return 'bg-yellow-100 text-yellow-800';
      case TaskStatus.EM_ANDAMENTO:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.FINALIZADO:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa cadastrada</h3>
        <p className="text-gray-500">Comece adicionando sua primeira tarefa.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {getStatusIcon(task.status)}
                <h3 className="text-lg font-semibold text-gray-900">{task.nome}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">{task.descricao}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  Criado em: {formatDate(task.dataCriacao)}
                </div>
                {task.user && task.user.length > 0 && (
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {task.user.length} usuário{task.user.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              {task.user && task.user.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {task.user.map((user) => (
                      <span
                        key={user.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                      >
                        {user.nome}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                title="Editar tarefa"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => task.id && onDelete(task.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Excluir tarefa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;