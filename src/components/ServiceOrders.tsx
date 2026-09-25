import React from 'react';
import { ServiceOrder, OSStatus } from '../types';

interface ServiceOrdersProps {
  orders: ServiceOrder[];
  onUpdateStatus: (id: string, status: OSStatus) => void;
}

export const ServiceOrders: React.FC<ServiceOrdersProps> = ({ orders, onUpdateStatus }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID O.S.</th>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Alterar Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td><strong>{o.id}</strong></td>
              <td>{o.clientName}</td>
              <td>{o.serviceType}</td>
              <td>{o.createdAt}</td>
              <td>{o.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>
                <span className={`badge badge--${o.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {o.status}
                </span>
              </td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => onUpdateStatus(o.id, e.target.value as OSStatus)}
                  style={{ padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
                >
                  <option value="Aguardando Aprovação">Aguardando Aprovação</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Recusado">Recusado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
