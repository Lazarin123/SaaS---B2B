import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ServiceOrders } from './components/ServiceOrders';
import { ClientsPage } from './components/ClientsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { ClientPortal } from './components/ClientPortal';
import { NewOSModal } from './components/NewOSModal';
import { initialOrders, initialClients } from './data/mockData';
import { ServiceOrder, Client, OSStatus } from './type';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [orders, setOrders] = useState<ServiceOrder[]>(initialOrders);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleUpdateStatus = (id: string, newStatus: OSStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleAddOS = (newOSData: Omit<ServiceOrder, 'id' | 'createdAt'>) => {
    const newOS: ServiceOrder = {
      ...newOSData,
      id: `OS-${1000 + orders.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOrders([newOS, ...orders]);
  };

  const handleAddClient = (clientData: Omit<Client, 'id' | 'totalOrders' | 'totalSpent'>) => {
    const newClient: Client = {
      ...clientData,
      id: `CLI-0${clients.length + 1}`,
      totalOrders: 0,
      totalSpent: 0
    };
    setClients([...clients, newClient]);
  };

  const handleEditClient = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="app-container__main">
        <Header
          title={
            currentTab === 'dashboard' ? 'Dashboard Executivo' :
            currentTab === 'orders' ? 'Ordens de Serviço' :
            currentTab === 'clients' ? 'Gestão de Clientes' :
            currentTab === 'analytics' ? 'Métricas e Relatórios' : 'Portal do Cliente'
          }
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenNewOS={() => setIsModalOpen(true)}
        />
        <main className="app-container__content">
          {currentTab === 'dashboard' && <Dashboard orders={orders} clients={clients} />}
          {currentTab === 'orders' && <ServiceOrders orders={orders} onUpdateStatus={handleUpdateStatus} />}
          {currentTab === 'clients' && (
            <ClientsPage
              clients={clients}
              onAddClient={handleAddClient}
              onEditClient={handleEditClient}
              onDeleteClient={handleDeleteClient}
            />
          )}
          {currentTab === 'analytics' && <AnalyticsPage orders={orders} clients={clients} />}
          {currentTab === 'portal' && (
            <ClientPortal
              orders={orders}
              onApprove={(id) => handleUpdateStatus(id, 'Aprovado')}
              onReject={(id) => handleUpdateStatus(id, 'Recusado')}
            />
          )}
        </main>
      </div>

      <NewOSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddOS={handleAddOS}
        clients={clients}
      />
    </div>
  );
}

export default App;
