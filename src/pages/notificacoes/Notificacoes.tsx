import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Calendar,
  Award,
  BookOpen,
  Users,
  Eye,
  Check,
  X,
  Filter
} from '../../lib/icons';
import { notificacoes } from '@/data/mockData';
import { Notificacao } from '@/types';

export function Notificacoes() {
  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<Notificacao | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'seminario': return BookOpen;
      case 'concurso': return Award;
      case 'planificacao': return Calendar;
      default: return Bell;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'seminario': return 'bg-blue-100 text-blue-600';
      case 'concurso': return 'bg-green-100 text-green-600';
      case 'planificacao': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'seminario': return 'Seminário';
      case 'concurso': return 'Concurso';
      case 'planificacao': return 'Planificação';
      default: return 'Geral';
    }
  };

  const notificacoesFiltradas = filtroTipo === 'todas' 
    ? notificacoes 
    : notificacoes.filter(n => n.tipo === filtroTipo);

  const naoLidas = notificacoes.filter(n => !n.lida).length;
  const importantes = notificacoes.filter(n => n.importante).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Bell className="mr-3 h-8 w-8" />
            Notificações
          </h1>
          <p className="text-muted-foreground">
            Mantenha-se atualizado com informações importantes
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Marcar todas como lidas
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{naoLidas}</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Importantes</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{importantes}</div>
            <p className="text-xs text-muted-foreground">Alta prioridade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificacoes.length}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas" onClick={() => setFiltroTipo('todas')}>
            Todas ({notificacoes.length})
          </TabsTrigger>
          <TabsTrigger value="seminario" onClick={() => setFiltroTipo('seminario')}>
            Seminários
          </TabsTrigger>
          <TabsTrigger value="concurso" onClick={() => setFiltroTipo('concurso')}>
            Concursos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lista de Notificações */}
            <Card>
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
                <CardDescription>Ordenadas por data de recebimento</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2 p-4">
                    {notificacoesFiltradas.map((notificacao) => {
                      const Icon = getTipoIcon(notificacao.tipo);
                      return (
                        <div
                          key={notificacao.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            !notificacao.lida ? 'border-blue-200 bg-blue-50' : 'hover:bg-muted/50'
                          } ${
                            notificacaoSelecionada?.id === notificacao.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setNotificacaoSelecionada(notificacao)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${getTipoColor(notificacao.tipo)}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className={`font-medium ${!notificacao.lida ? 'text-blue-900' : ''}`}>
                                  {notificacao.titulo}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {notificacao.importante && (
                                    <Badge variant="destructive" className="text-xs">
                                      Importante
                                    </Badge>
                                  )}
                                  {!notificacao.lida && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {notificacao.conteudo}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {getTipoLabel(notificacao.tipo)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(notificacao.data).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Detalhes da Notificação Selecionada */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Notificação</CardTitle>
                <CardDescription>
                  {notificacaoSelecionada ? 'Informações completas' : 'Selecione uma notificação'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notificacaoSelecionada ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${getTipoColor(notificacaoSelecionada.tipo)}`}>
                        {(() => {
                          const Icon = getTipoIcon(notificacaoSelecionada.tipo);
                          return <Icon className="h-6 w-6" />;
                        })()}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">{notificacaoSelecionada.titulo}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">
                            {getTipoLabel(notificacaoSelecionada.tipo)}
                          </Badge>
                          {notificacaoSelecionada.importante && (
                            <Badge variant="destructive">Importante</Badge>
                          )}
                          {!notificacaoSelecionada.lida && (
                            <Badge variant="secondary">Não lida</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Conteúdo</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {notificacaoSelecionada.conteudo}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Data de Recebimento</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(notificacaoSelecionada.data).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      {!notificacaoSelecionada.lida && (
                        <Button variant="outline" size="sm">
                          <Check className="mr-2 h-4 w-4" />
                          Marcar como Lida
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Remover
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Selecione uma notificação para ver os detalhes
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conteúdo similar para outras abas */}
        <TabsContent value="seminario">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Seminários e Formações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificacoes
                  .filter(n => n.tipo === 'seminario')
                  .map((notificacao) => (
                    <div key={notificacao.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{notificacao.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notificacao.conteudo}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">Seminário</Badge>
                        <Button size="sm">Ver Detalhes</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concurso">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Concursos e Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificacoes
                  .filter(n => n.tipo === 'concurso')
                  .map((notificacao) => (
                    <div key={notificacao.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{notificacao.titulo}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notificacao.conteudo}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">Concurso</Badge>
                        <Button size="sm">Saiba Mais</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}