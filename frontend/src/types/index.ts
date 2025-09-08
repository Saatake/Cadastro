export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  idade: number;
  tarefas?: Task;
}

export interface Task {
  id?: number;
  nome: string;
  descricao: string;
  status: TaskStatus;
  dataCriacao: string;
  user?: User[];
}

export enum TaskStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO'
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}