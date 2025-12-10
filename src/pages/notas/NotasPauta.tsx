import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  GraduationCap,
  Edit,
  Download,
  Calculator,
  Eye,
  Mail
} from '../../lib/icons';
import { turmas } from '@/data/mockData';
import { Turma, Aluno } from '@/types';

export function NotasPauta() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma>(turmas[0]);
  const [trimestreSelecionado, setTrimestreSelecionado] = useState('1');

  const calcularMedia = (aluno: Aluno) => {
    const notasTrimestre = aluno.notas.filter(n => n.trimestre === parseInt(trimestreSelecionado));
    if (notasTrimestre.length === 0) return 0;
    const soma = notasTrimestre.reduce((acc, nota) => acc + nota.valor, 0);
    return Math.round((soma / notasTrimestre.length) * 10) / 10;
  };

  const getStatusNota = (media: number) => {
    if (media >= 14) return { status: 'Aprovado', color: 'default' };
    if (media >= 10) return { status: 'Recuperação', color: 'secondary' };
    return { status: 'Reprovado', color: 'destructive' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notas & Pauta</h1>
          <p className="text-muted-foreground">Gerencie as notas dos seus alunos por trimestre</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Pauta
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-green-600 hover:bg-green-500 text-white hover:text-white'>
                <Plus className="mr-2 h-4 w-4" />
                Lançar Notas
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Lançar Notas</DialogTitle>
                <DialogDescription>
                  Adicione novas avaliações para seus alunos
                </DialogDescription>
              </DialogHeader>
              <LancarNotasForm turma={turmaSelecionada} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Seleção de Turma e Trimestre */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="turma">Turma</Label>
          <Select value={turmaSelecionada.id} onValueChange={(value) => {
            const turma = turmas.find(t => t.id === value);
            if (turma) setTurmaSelecionada(turma);
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {turmas.map(turma => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome} - {turma.serie} ({turma.disciplina})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Label htmlFor="trimestre">Trimestre</Label>
          <Select value={trimestreSelecionado} onValueChange={setTrimestreSelecionado}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1º Trimestre</SelectItem>
              <SelectItem value="2">2º Trimestre</SelectItem>
              <SelectItem value="3">3º Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pauta" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pauta">Pauta da Turma</TabsTrigger>
          <TabsTrigger value="individual">Notas Individuais</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="pauta">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Pauta - {turmaSelecionada.nome} ({trimestreSelecionado}º Trimestre)
              </CardTitle>
              <CardDescription>
                {turmaSelecionada.disciplina} • {turmaSelecionada.alunos.length} alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Nome do Aluno</TableHead>
                      <TableHead className="text-center">Avaliações</TableHead>
                      <TableHead className="text-center">Testes</TableHead>
                      <TableHead className="text-center">Trabalhos</TableHead>
                      <TableHead className="text-center">Média</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {turmaSelecionada.alunos.map((aluno, index) => {
                      const notasTrimestre = aluno.notas.filter(n => n.trimestre === parseInt(trimestreSelecionado));
                      const avaliacoes = notasTrimestre.filter(n => n.tipo === 'avaliacao');
                      const testes = notasTrimestre.filter(n => n.tipo === 'teste');
                      const trabalhos = notasTrimestre.filter(n => n.tipo === 'trabalho');
                      const media = calcularMedia(aluno);
                      const statusInfo = getStatusNota(media);

                      return (
                        <TableRow key={aluno.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{aluno.nome}</div>
                              <div className="text-sm text-muted-foreground">ID: {aluno.id}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {avaliacoes.length ? avaliacoes.map(n => n.valor).join(', ') : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {testes.length ? testes.map(n => n.valor).join(', ') : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {trabalhos.length ? trabalhos.map(n => n.valor).join(', ') : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold text-lg">{media}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={statusInfo.color as any} className={ statusInfo.status == "aprovado" ? "bg-green-600 text-white": "bg-red-600 text-white"}>
                              {statusInfo.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center space-x-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {turmaSelecionada.alunos.map((aluno) => (
              <Card key={aluno.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{aluno.nome}</CardTitle>
                  <CardDescription>
                    Histórico de notas - {trimestreSelecionado}º Trimestre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aluno.notas
                      .filter(n => n.trimestre === parseInt(trimestreSelecionado))
                      .map((nota) => (
                        <div key={nota.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium capitalize">{nota.tipo}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(nota.data).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">{nota.valor}</div>
                            <div className="text-sm text-muted-foreground">/ 20</div>
                          </div>
                        </div>
                      ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Média do Trimestre:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {calcularMedia(aluno)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Enviar p/ Encarregado
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="estatisticas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Média da Turma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    turmaSelecionada.alunos.reduce((acc, aluno) => acc + calcularMedia(aluno), 0) / 
                    turmaSelecionada.alunos.length * 10
                  ) / 10}
                </div>
                <p className="text-xs text-muted-foreground">{trimestreSelecionado}º Trimestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    (turmaSelecionada.alunos.filter(aluno => calcularMedia(aluno) >= 14).length / 
                    turmaSelecionada.alunos.length) * 100
                  )}%
                </div>
                <p className="text-xs text-muted-foreground">Alunos aprovados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Em Recuperação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {turmaSelecionada.alunos.filter(aluno => {
                    const media = calcularMedia(aluno);
                    return media >= 10 && media < 14;
                  }).length}
                </div>
                <p className="text-xs text-muted-foreground">Alunos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Reprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {turmaSelecionada.alunos.filter(aluno => calcularMedia(aluno) < 10).length}
                </div>
                <p className="text-xs text-muted-foreground">Alunos</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LancarNotasForm({ turma }: { turma: Turma }) {
  const [tipoAvaliacao, setTipoAvaliacao] = useState('');
  const [trimestre, setTrimestre] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tipo">Tipo de Avaliação</Label>
          <Select value={tipoAvaliacao} onValueChange={setTipoAvaliacao}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="avaliacao">Avaliação</SelectItem>
              <SelectItem value="teste">Teste</SelectItem>
              <SelectItem value="trabalho">Trabalho</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="trimestre">Trimestre</Label>
          <Select value={trimestre} onValueChange={setTrimestre}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o trimestre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1º Trimestre</SelectItem>
              <SelectItem value="2">2º Trimestre</SelectItem>
              <SelectItem value="3">3º Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-96 border rounded-lg p-4">
        <div className="space-y-4">
          {turma.alunos.map((aluno) => (
            <div key={aluno.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{aluno.nome}</div>
                <div className="text-sm text-muted-foreground">ID: {aluno.id}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="Nota"
                  className="w-20 text-center"
                />
                <span className="text-sm text-muted-foreground">/ 20</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Cancelar</Button>
        <Button className='bg-green-600 hover:bg-green-500 text-white hover:text-white'>
          <Calculator className="mr-2 h-4 w-4" />
          Salvar Notas
        </Button>
      </div>
    </div>
  );
}