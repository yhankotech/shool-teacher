import { Professor, Turma, Aluno, PlanoAula, Notificacao, AtividadeEscolar } from '@/types';

export const professor: Professor = {
  id: '1',
  nome: 'Prof. Maria Silva',
  email: 'maria.silva@escola.ao',
  disciplinas: ['Matemática', 'Física'],
  turmas: ['10A', '11B', '12C'],
  avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
};

export const turmas: Turma[] = [
  {
    id: '1',
    nome: '10A',
    serie: '10ª Classe',
    disciplina: 'Matemática',
    ano: 2024,
    alunos: [
      {
        id: '1',
        nome: 'João António',
        turmaId: '1',
        notas: [
          { id: '1', alunoId: '1', disciplina: 'Matemática', valor: 16, trimestre: 1, tipo: 'avaliacao', data: '2024-03-15' },
          { id: '2', alunoId: '1', disciplina: 'Matemática', valor: 14, trimestre: 1, tipo: 'teste', data: '2024-03-20' }
        ],
        encarregado: {
          id: '1',
          nome: 'Ana António',
          telefone: '+244 923 456 789',
          email: 'ana.antonio@email.com',
          relacao: 'Mãe'
        }
      },
      {
        id: '2',
        nome: 'Maria Fernandes',
        turmaId: '1',
        notas: [
          { id: '3', alunoId: '2', disciplina: 'Matemática', valor: 18, trimestre: 1, tipo: 'avaliacao', data: '2024-03-15' },
          { id: '4', alunoId: '2', disciplina: 'Matemática', valor: 17, trimestre: 1, tipo: 'teste', data: '2024-03-20' }
        ],
        encarregado: {
          id: '2',
          nome: 'Carlos Fernandes',
          telefone: '+244 924 567 890',
          email: 'carlos.fernandes@email.com',
          relacao: 'Pai'
        }
      }
    ]
  }
];

export const planosAula: PlanoAula[] = [
  {
    id: '1',
    titulo: 'Equações do 2º Grau',
    disciplina: 'Matemática',
    turmaId: '1',
    data: '2024-01-20',
    objetivos: [
      'Compreender o conceito de equações quadráticas',
      'Resolver equações do 2º grau usando fórmula resolvente',
      'Aplicar conhecimentos em problemas práticos'
    ],
    conteudo: 'Definição de equações quadráticas, fórmula resolvente, discriminante e suas interpretações geométricas.',
    metodologia: 'Aula expositiva seguida de exercícios práticos em grupo',
    recursos: ['Quadro', 'Calculadora', 'Fichas de exercícios'],
    avaliacao: 'Exercícios práticos e participação oral',
    status: 'aprovado',
    professorId: '1'
  },
  {
    id: '2',
    titulo: 'Funções Trigonométricas',
    disciplina: 'Matemática',
    turmaId: '1',
    data: '2024-01-25',
    objetivos: [
      'Definir seno, cosseno e tangente',
      'Calcular valores trigonométricos',
      'Resolver problemas usando trigonometria'
    ],
    conteudo: 'Círculo trigonométrico, funções seno, cosseno e tangente, identidades trigonométricas básicas.',
    metodologia: 'Demonstração prática com uso de calculadora científica',
    recursos: ['Calculadora científica', 'Círculo trigonométrico', 'Exercícios'],
    avaliacao: 'Teste escrito sobre cálculos trigonométricos',
    status: 'pendente',
    professorId: '1'
  }
];

export const notificacoes: Notificacao[] = [
  {
    id: '1',
    titulo: 'Seminário de Metodologias Inovadoras',
    conteudo: 'Participe do seminário sobre novas metodologias de ensino. Data: 15 de Fevereiro, Local: Auditório Principal.',
    tipo: 'seminario',
    data: '2024-01-15T09:00:00Z',
    lida: false,
    importante: true
  },
  {
    id: '2',
    titulo: 'Recibo de Pagamento - Janeiro 2024',
    conteudo: 'Seu recibo de pagamento referente ao mês de Janeiro está disponível para download.',
    tipo: 'pagamento',
    data: '2024-01-31T14:30:00Z',
    lida: false,
    importante: false
  },
  {
    id: '3',
    titulo: 'Concurso Público de Professores 2024',
    conteudo: 'Abertas as inscrições para o concurso público de professores. Prazo limite: 28 de Fevereiro.',
    tipo: 'concurso',
    data: '2024-01-10T08:00:00Z',
    lida: true,
    importante: true
  }
];

export const atividades: AtividadeEscolar[] = [
  {
    id: '1',
    titulo: 'Feira de Ciências 2024',
    descricao: 'Exposição de projetos científicos dos alunos de todas as turmas.',
    data: '2024-03-15',
    tipo: 'escolar',
    participantes: ['10A', '11B', '12C']
  },
  {
    id: '2',
    titulo: 'Torneio de Futebol Inter-turmas',
    descricao: 'Competição desportiva entre as turmas da escola.',
    data: '2024-02-20',
    tipo: 'extraescolar',
    participantes: ['10A', '11A', '11B', '12A', '12B', '12C']
  },
  {
    id: '3',
    titulo: 'Palestra sobre Orientação Vocacional',
    descricao: 'Orientação para alunos do 12º ano sobre escolhas universitárias.',
    data: '2024-02-10',
    tipo: 'escolar',
    participantes: ['12A', '12B', '12C']
  }
];