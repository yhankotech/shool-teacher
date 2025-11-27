export interface Professor {
  id: string;
  nome: string;
  email: string;
  disciplinas: string[];
  turmas: string[];
  avatar?: string;
}

export interface Turma {
  id: string;
  nome: string;
  serie: string;
  disciplina: string;
  alunos: Aluno[];
  ano: number;
}

export interface Aluno {
  id: string;
  nome: string;
  turmaId: string;
  notas: Nota[];
  encarregado: Encarregado;
  avatar?: string;
}

export interface Nota {
  id: string;
  alunoId: string;
  disciplina: string;
  valor: number;
  trimestre: number;
  tipo: 'avaliacao' | 'teste' | 'trabalho';
  data: string;
}

export interface Encarregado {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  relacao: string;
}

export interface PlanoAula {
  id: string;
  titulo: string;
  disciplina: string;
  turmaId: string;
  data: string;
  objetivos: string[];
  conteudo: string;
  metodologia: string;
  recursos: string[];
  avaliacao: string;
  status: 'rascunho' | 'aprovado' | 'pendente';
  professorId: string;
}

export interface Mensagem {
  id: string;
  remetenteId: string;
  destinatarioId: string;
  conteudo: string;
  data: string;
  lida: boolean;
  tipo: 'individual' | 'grupo';
}

export interface Notificacao {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'seminario' | 'concurso' | 'planificacao' | 'geral';
  data: string;
  lida: boolean;
  importante: boolean;
}

export interface AtividadeEscolar {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'escolar' | 'extraescolar';
  participantes: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  year: string;
  avatar?: string;
  enrollmentNumber: string;
}

export interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  type: 'test' | 'exam' | 'assignment' | 'project';
  date: string;
  teacher: string;
  period: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  teacherId: string;
  code: string;
  color: string;
  description: string;
  currentGrade: number;
  attendance: number;
}

export interface Message {
  id: string;
  sender: string;
  senderType: 'teacher' | 'parent' | 'school' | 'system';
  subject: string;
  content: string;
  date: string;
  read: boolean;
  attachments?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'exam' | 'event' | 'meeting' | 'deadline' | 'holiday';
  subject?: string;
  location?: string;
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'tuition' | 'fee' | 'material' | 'transport';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'game';
  subject: string;
  url: string;
  description: string;
  uploadDate: string;
}

export interface AIConversation {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  subject?: string;
  helpful?: boolean;
}