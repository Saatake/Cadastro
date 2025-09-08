import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, User } from '../types';
import { X } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  users: User[];
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  users,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    status: TaskStatus.PENDENTE,
    dataCriacao: '',
    selectedUsers: [] as number[],
  });

  useEffect(() => {
    if (task) {
      setFormData({
        nome: task.nome,
        descricao: task.descricao,
        status: task.status,
        dataCriacao: task.dataCriacao.slice(0, 16), // Format for datetime-local input
        selectedUsers: task.user?.map(u => u.id!).filter(id => id !== undefined) || [],
      });
    } else {
      // Set default date to now
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setFormData(prev => ({
        ...prev,
        dataCriacao: localDateTime,
      }));
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Omit<Task, 'id'> = {
      nome: formData.nome,
      descricao: formData.descricao,
      status: formData.status,
      dataCriacao: formData.dataCriacao,
      user: formData.selectedUsers.map(id => ({ id } as User)),
    };

    onSubmit(taskData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSelection = (userId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(userId)
        ? prev.selectedUsers.filter(id => id !== userId)
        : [...prev.selectedUsers, userId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Tarefa *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Digite o nome da tarefa"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              rows={3}
              className="input-field resize-none"
              placeholder="Descreva a tarefa"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value={TaskStatus.PENDENTE}>Pendente</option>
              <option value={TaskStatus.EM_ANDAMENTO}>Em Andamento</option>
              <option value={TaskStatus.FINALIZADO}>Finalizado</option>
            </select>
          </div>

          <div>
            <label htmlFor="dataCriacao" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Criação *
            </label>
            <input
              type="datetime-local"
              id="dataCriacao"
              name="dataCriacao"
              value={formData.dataCriacao}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuários Associados
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-1">
              {users.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-2">
                  Nenhum usuário cadastrado
                </p>
              ) : (
                users.map((user) => (
                  <label key={user.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={formData.selectedUsers.includes(user.id!)}
                      onChange={() => handleUserSelection(user.id!)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{user.nome}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Salvando...' : task ? 'Atualizar' : 'Cadastrar'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;