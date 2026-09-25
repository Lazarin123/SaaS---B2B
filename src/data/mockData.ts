import { ServiceOrder, Client } from '../types';

export const initialClients: Client[] = [
  { id: 'CLI-01', name: 'Acme Corporation', email: 'contato@acme.com', phone: '(11) 98888-1111', totalOrders: 5, totalSpent: 12500 },
  { id: 'CLI-02', name: 'Inova Tech', email: 'tech@inova.com', phone: '(11) 97777-2222', totalOrders: 3, totalSpent: 8200 },
  { id: 'CLI-03', name: 'Nexus Soluções', email: 'contato@nexus.com', phone: '(11) 96666-3333', totalOrders: 2, totalSpent: 4500 },
];

export const initialOrders: ServiceOrder[] = [
  {
    id: 'OS-1001',
    clientName: 'Acme Corporation',
    clientPhone: '(11) 98888-1111',
    serviceType: 'Manutenção Preventiva',
    description: 'Revisão periódica de infraestrutura de servidores e calibração de atuadores.',
    value: 2500,
    status: 'Aguardando Aprovação',
    createdAt: '2026-09-20',
    estimatedCompletion: '2026-09-30'
  },
  {
    id: 'OS-1002',
    clientName: 'Inova Tech',
    clientPhone: '(11) 97777-2222',
    serviceType: 'Troca de Componentes',
    description: 'Substituição de placa controladora principal e testes funcionais.',
    value: 4200,
    status: 'Em Andamento',
    createdAt: '2026-09-18',
    estimatedCompletion: '2026-09-28'
  },
  {
    id: 'OS-1003',
    clientName: 'Nexus Soluções',
    clientPhone: '(11) 96666-3333',
    serviceType: 'Consultoria Técnica',
    description: 'Laudo de inspeção física e otimização operacional.',
    value: 1800,
    status: 'Concluído',
    createdAt: '2026-09-10',
    estimatedCompletion: '2026-09-15'
  }
];
