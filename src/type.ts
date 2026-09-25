export type OSStatus = 'Aguardando Aprovação' | 'Aprovado' | 'Em Andamento' | 'Concluído' | 'Recusado' | 'Cancelado';

export interface ServiceOrder {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceType: string;
  description: string;
  value: number;
  status: OSStatus;
  createdAt: string;
  estimatedCompletion: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}
