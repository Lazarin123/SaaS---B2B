import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Printer } from 'lucide-react';
import { ServiceOrder, Client } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

interface AnalyticsPageProps {
  orders: ServiceOrder[];
  clients: Client[];
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ orders, clients }) => {
  const lineData = {
    labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set'],
    datasets: [
      {
        label: 'Faturamento Mensal (R$)',
        data: [12000, 15000, 18000, 14000, 22500],
        borderColor: '#d97706',
        backgroundColor: 'rgba(217, 119, 6, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const statusPieData = {
    labels: ['Aprovadas', 'Aguardando', 'Recusadas', 'Concluídas'],
    datasets: [
      {
        data: [
          orders.filter(o => o.status === 'Aprovado').length,
          orders.filter(o => o.status === 'Aguardando Aprovação').length,
          orders.filter(o => o.status === 'Recusado').length,
          orders.filter(o => o.status === 'Concluído').length,
        ],
        backgroundColor: ['#059669', '#7c3aed', '#dc2626', '#047857'],
      },
    ],
  };

  // Mapeamento dinâmico de quantidade de O.S. por cliente
  const clientOSData = {
    labels: clients.map(c => c.name),
    datasets: [
      {
        label: 'Quantidade de O.S.',
        data: clients.map(c => orders.filter(o => o.clientName === c.name).length || c.totalOrders),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3>Relatórios Gerenciais e Analytics</h3>
        <button className="btn btn--outline no-print" onClick={() => window.print()}>
          <Printer size={18} /> Imprimir Relatório Executivo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="dashboard__card" style={{ height: '320px' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Evolução de Receita</h4>
          <div style={{ width: '100%', height: '80%' }}>
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="dashboard__card" style={{ height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Proporção Global de Status</h4>
          <div style={{ width: '80%', height: '80%' }}>
            <Pie data={statusPieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="dashboard__card" style={{ height: '320px' }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Volume de Ordens de Serviço por Cliente</h4>
        <div style={{ width: '100%', height: '80%' }}>
          <Bar
            data={clientOSData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>
    </div>
  );
};
