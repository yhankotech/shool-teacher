import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PlanosAula } from '@/components/planos/PlanosAula';
import { NotasPauta } from '@/components/notas/NotasPauta';
import { Chat } from '@/components/chat/Chat';
import { CalendarView } from "@/components/calendar/CalendarView";
import { IAAssistant } from '@/components/ia/IAAssistant';
import { Notificacoes } from '@/components/notificacoes/Notificacoes';
import { ResourcesView } from "@/components/resources/ResourcesView";
import { StudentProvider } from '@/contexts/StudentContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'planos':
        return <PlanosAula />;
      case 'notas':
        return <NotasPauta />;
      case 'chat':
        return <Chat />;
      case 'ia-assistant':
        return <IAAssistant />;
      case 'notificacoes':
        return <Notificacoes />;
      case 'atividades':
             case 'calendar':
        return <CalendarView />;
      case 'recursos':
        return <ResourcesView/>
    }
  };

  return (
      <StudentProvider>
            <div className="flex h-screen w-screen bg-gray-50">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            
            <main className="flex-1 overflow-y-auto p-6">
              {renderActiveTab()}
            </main>
          </div>
        </div>
      </StudentProvider>
    
  );
}

export default App;