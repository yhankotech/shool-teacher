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
  tipo: 'seminario' | 'concurso' | 'pagamento' | 'planificacao' | 'geral';
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