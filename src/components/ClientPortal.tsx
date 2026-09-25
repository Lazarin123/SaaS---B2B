import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CheckCircle, XCircle, Printer } from 'lucide-react';
import { ServiceOrder } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ClientPortalProps {
  orders: ServiceOrder[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ orders, onApprove, onReject }) => {
  const [selectedOSId, setSelectedOSId] = useState<string>(orders[0]?.id || '');

  const selectedOrder = orders.find(o => o.id === selectedOSId) || orders[0];

  const pieData = {
    labels: ['Aprovadas/Ativas', 'Concluídas', 'Aguardando Aprovação', 'Recusadas/Canceladas'],
    datasets: [
      {
        data: [
          orders.filter(o => o.status === 'Aprovado' || o.status === 'Em Andamento').length,
          orders.filter(o => o.status === 'Concluído').length,
          orders.filter(o => o.status === 'Aguardando Aprovação').length,
          orders.filter(o => o.status === 'Recusado' || o.status === 'Cancelado').length,
        ],
        backgroundColor: ['#2563eb', '#059669', '#7c3aed', '#dc2626'],
      },
    ],
  };

  return (
    <div>
      {/* Panorama de Status (Ocultado na Impressão) */}
      <div className="dashboard__card no-print" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Panorama Geral de Serviços</h3>
        <div style={{ width: '280px', height: '200px' }}>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Listagem Global de O.S. (Ocultada na Impressão) */}
      <h3 className="no-print" style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Todas as Ordens de Serviço</h3>
      <div className="table-container no-print" style={{ marginBottom: '2rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ backgroundColor: o.id === selectedOSId ? 'var(--table-header-bg)' : 'transparent' }}>
                <td><strong>{o.id}</strong></td>
                <td>{o.serviceType}</td>
                <td>{o.createdAt}</td>
                <td>
                  <span className={`badge badge--${o.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {o.status}
                  </span>
                </td>
                <td>{o.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                  <button className="btn btn--outline" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => setSelectedOSId(o.id)}>
                    Visualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Documento Impresso Exclusivo da O.S. Selecionada */}
      {selectedOrder && (
        <div className="portal-view print-area">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>OpsVantage Services</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ordem de Serviço Nº <strong>{selectedOrder.id}</strong></p>
            </div>
            <button className="btn btn--outline no-print" onClick={() => window.print()}>
              <Printer size={18} /> Imprimir Apenas esta O.S.
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Cliente:</span>
              <strong>{selectedOrder.clientName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Telefone / Contato:</span>
              <span>{selectedOrder.clientPhone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tipo de Serviço:</span>
              <strong>{selectedOrder.serviceType}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Descrição:</span>
              <span style={{ textAlign: 'right', maxWidth: '320px' }}>{selectedOrder.description}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Data de Entrada:</span>
              <span>{selectedOrder.createdAt}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Previsão de Entrega:</span>
              <strong>{selectedOrder.estimatedCompletion}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.25rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
              <span>Valor Total:</span>
              <strong style={{ color: '#d97706' }}>
                {selectedOrder.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </div>
          </div>

          {selectedOrder.status === 'Aguardando Aprovação' && (
            <div className="portal-view__actions no-print">
              <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => onApprove(selectedOrder.id)}>
                <CheckCircle size={18} /> Aprovar Orçamento
              </button>
              <button className="btn btn--secondary" style={{ flex: 1 }} onClick={() => onReject(selectedOrder.id)}>
                <XCircle size={18} /> Recusar Orçamento
              </button>
            </div>
          )}

          {/* Campo de Assinaturas */}
          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Declaro estar de acordo com as especificações e valores discriminados nesta Ordem de Serviço.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ borderBottom: '1px solid #000', marginBottom: '0.5rem', width: '80%', margin: '0 auto' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Assinatura do Cliente</span>
              </div>
              <div>
                <div style={{ borderBottom: '1px solid #000', marginBottom: '0.5rem', width: '80%', margin: '0 auto' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Assinatura do Técnico / Empresa</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
