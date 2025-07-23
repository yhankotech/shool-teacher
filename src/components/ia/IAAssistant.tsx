import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bot,
  Send,
  BookOpen,
  Lightbulb,
  Users,
  Target,
  MessageCircle,
  Sparkles,
  Brain,
  FileText
} from 'lucide-react';

interface Conversa {
  id: string;
  pergunta: string;
  resposta: string;
  categoria: string;
  hora: string;
}

const conversasExemplo: Conversa[] = [
  {
    id: '1',
    pergunta: 'Como posso tornar as aulas de matemática mais dinâmicas?',
    resposta: 'Aqui estão algumas estratégias para tornar suas aulas de matemática mais envolventes:\n\n1. **Gamificação**: Use jogos matemáticos e competições saudáveis\n2. **Tecnologia**: Incorpore calculadoras gráficas e softwares educativos\n3. **Problemas do cotidiano**: Relacione conceitos com situações reais\n4. **Trabalho em grupo**: Promova discussões e resolução colaborativa\n5. **Manipulativos**: Use materiais concretos para conceitos abstratos',
    categoria: 'metodologia',
    hora: '14:30'
  },
  {
    id: '2',
    pergunta: 'Qual a melhor forma de avaliar o progresso dos alunos?',
    resposta: 'A avaliação eficaz deve ser contínua e diversificada:\n\n• **Avaliação formativa**: Feedback constante durante o processo\n• **Portfólio**: Coleção de trabalhos mostrando evolução\n• **Autoavaliação**: Desenvolve consciência metacognitiva\n• **Avaliação por pares**: Promove colaboração\n• **Rubricas claras**: Critérios transparentes de avaliação\n• **Observação direta**: Anotações sobre participação e engajamento',
    categoria: 'avaliacao',
    hora: '13:15'
  }
];

const sugestoes = [
  { texto: 'Como motivar alunos desmotivados?', categoria: 'motivacao' },
  { texto: 'Estratégias para ensino híbrido', categoria: 'metodologia' },
  { texto: 'Gestão de tempo em sala de aula', categoria: 'organizacao' },
  { texto: 'Atividades para diferentes estilos de aprendizagem', categoria: 'inclusao' }
];

const recursosIA = [
  {
    titulo: 'Gerador de Planos de Aula',
    descricao: 'Crie planos detalhados baseados em objetivos de aprendizagem',
    icon: FileText,
    categoria: 'planejamento'
  },
  {
    titulo: 'Banco de Questões',
    descricao: 'Acesse milhares de exercícios categorizados por dificuldade',
    icon: Target,
    categoria: 'avaliacao'
  },
  {
    titulo: 'Análise de Desempenho',
    descricao: 'Insights sobre o progresso individual e da turma',
    icon: Brain,
    categoria: 'analise'
  },
  {
    titulo: 'Sugestões Metodológicas',
    descricao: 'Estratégias personalizadas para cada conteúdo',
    icon: Lightbulb,
    categoria: 'metodologia'
  }
];

export function IAAssistant() {
  const [conversas, setConversas] = useState<Conversa[]>(conversasExemplo);
  const [pergunta, setPergunta] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    setLoading(true);
    
    // Simular resposta da IA
    setTimeout(() => {
      const novaConversa: Conversa = {
        id: Date.now().toString(),
        pergunta: pergunta,
        resposta: 'Esta é uma resposta simulada da IA. Em um sistema real, aqui seria integrada uma API de IA especializada em educação que forneceria respostas personalizadas baseadas em metodologias pedagógicas modernas e melhores práticas educacionais.',
        categoria: 'geral',
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversas([novaConversa, ...conversas]);
      setPergunta('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Bot className="mr-3 h-8 w-8 text-blue-600" />
            Assistente IA Pedagógico
          </h1>
          <p className="text-muted-foreground">Seu parceiro inteligente para metodologias e recursos de ensino</p>
        </div>
        <Badge variant="outline" className="flex items-center">
          <Sparkles className="mr-1 h-3 w-3" />
          Powered by EduAI
        </Badge>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat IA</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área de Chat */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Conversar com a IA
                </CardTitle>
                <CardDescription>
                  Faça perguntas sobre metodologias, planejamento, avaliação e muito mais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Faça sua pergunta sobre educação, metodologias, planejamento de aulas, estratégias de ensino..."
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    className="flex-1 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={enviarPergunta} 
                  disabled={loading || !pergunta.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Bot className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Pergunta
                    </>
                  )}
                </Button>

                {conversas.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <Separator />
                    <h3 className="font-semibold">Conversas Recentes</h3>
                    <ScrollArea className="h-96">
                      <div className="space-y-4">
                        {conversas.slice(0, 3).map((conversa) => (
                          <div key={conversa.id} className="p-4 border rounded-lg space-y-3">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{conversa.pergunta}</p>
                                <p className="text-xs text-muted-foreground">{conversa.hora}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-green-100 rounded-full">
                                <Bot className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-line">{conversa.resposta}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sugestões */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Sugestões
                </CardTitle>
                <CardDescription>Tópicos populares para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sugestoes.map((sugestao, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setPergunta(sugestao.texto)}
                    >
                      <div>
                        <p className="text-sm font-medium">{sugestao.texto}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {sugestao.categoria}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recursos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recursosIA.map((recurso, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <recurso.icon className="mr-2 h-5 w-5 text-blue-600" />
                    {recurso.titulo}
                  </CardTitle>
                  <CardDescription>{recurso.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{recurso.categoria}</Badge>
                    <Button size="sm">
                      Usar Recurso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>Todas as suas interações com a IA pedagógica</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {conversas.map((conversa) => (
                    <div key={conversa.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{conversa.categoria}</Badge>
                        <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                      </div>
                      <p className="font-medium text-sm mb-2">{conversa.pergunta}</p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {conversa.resposta}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Ver Completo
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}