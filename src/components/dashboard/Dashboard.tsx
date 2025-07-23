import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  MessageCircle,
  Plus
} from 'lucide-react';
import { turmas, planosAula, notificacoes, atividades } from '@/data/mockData';

const notasData = [
  { trimestre: '1º Trim', media: 15.2 },
  { trimestre: '2º Trim', media: 16.8 },
  { trimestre: '3º Trim', media: 17.1 }
];

const disciplinasData = [
  { name: 'Matemática', value: 65, color: '#3b82f6' },
  { name: 'Física', value: 35, color: '#10b981' }
];

export function Dashboard() {
  const totalAlunos = turmas.reduce((acc, turma) => acc + turma.alunos.length, 0);
  const planosAprovados = planosAula.filter(plano => plano.status === 'aprovado').length;
  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;
  const atividadesProximas = atividades.filter(a => new Date(a.data) > new Date()).length;

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlunos}</div>
            <p className="text-xs text-muted-foreground">Em 3 turmas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos de Aula</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{planosAprovados}/{planosAula.length}</div>
            <p className="text-xs text-muted-foreground">Aprovados este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificações</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificacoesNaoLidas}</div>
            <p className="text-xs text-muted-foreground">Não lidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividades</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{atividadesProximas}</div>
            <p className="text-xs text-muted-foreground">Próximas atividades</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Desempenho */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Desempenho por Trimestre
            </CardTitle>
            <CardDescription>Média das notas dos alunos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={notasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trimestre" />
                <YAxis domain={[0, 20]} />
                <Tooltip />
                <Bar dataKey="media" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Disciplina */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardCheck className="mr-2 h-5 w-5" />
              Distribuição por Disciplina
            </CardTitle>
            <CardDescription>Percentual de alunos por disciplina</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disciplinasData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {disciplinasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {disciplinasData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planos Recentes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Planos de Aula Recentes</CardTitle>
              <CardDescription>Últimos planos criados</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Plano
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planosAula.slice(0, 3).map((plano) => (
                <div key={plano.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{plano.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {plano.disciplina} - {new Date(plano.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant={plano.status === 'aprovado' ? 'default' : 'secondary'}>
                    {plano.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximas Atividades */}
        <Card>
          <CardHeader>
            <CardTitle>Próximas Atividades</CardTitle>
            <CardDescription>Atividades escolares programadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {atividades.slice(0, 3).map((atividade) => (
                <div key={atividade.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{atividade.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(atividade.data).toLocaleDateString('pt-BR')}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {atividade.tipo}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso do Ano Letivo */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso do Ano Letivo</CardTitle>
          <CardDescription>Acompanhamento das atividades do ano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Planos de Aula</span>
                <span>{planosAprovados}/{planosAula.length}</span>
              </div>
              <Progress value={(planosAprovados / planosAula.length) * 100} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Avaliações Realizadas</span>
                <span>8/12</span>
              </div>
              <Progress value={67} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Relatórios Enviados</span>
                <span>2/3</span>
              </div>
              <Progress value={67} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}