import React, { useState, useEffect } from 'react';
import { User, Task } from '../types';
import { X } from 'lucide-react';

interface UserFormProps {
  user?: User;
  tasks: Task[];
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  tasks,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    idade: '',
    tarefasId: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        idade: user.idade.toString(),
        tarefasId: user.tarefas?.id?.toString() || '',
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: Omit<User, 'id'> = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      idade: parseInt(formData.idade),
      tarefas: formData.tarefasId ? { id: parseInt(formData.tarefasId) } as Task : undefined,
    };

    onSubmit(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {user ? 'Editar Usuário' : 'Novo Usuário'}
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
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
              Senha *
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Digite a senha"
            />
          </div>

          <div>
            <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-1">
              Idade *
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
              min="1"
              max="120"
              className="input-field"
              placeholder="Digite a idade"
            />
          </div>

          <div>
            <label htmlFor="tarefasId" className="block text-sm font-medium text-gray-700 mb-1">
              Tarefa Associada
            </label>
            <select
              id="tarefasId"
              name="tarefasId"
              value={formData.tarefasId}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selecione uma tarefa (opcional)</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.nome} - {task.status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Salvando...' : user ? 'Atualizar' : 'Cadastrar'}
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

export default UserForm;