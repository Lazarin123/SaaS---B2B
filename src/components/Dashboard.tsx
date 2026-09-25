import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Lightbulb, TrendingUp, ShieldAlert } from 'lucide-react';
import { ServiceOrder, Client } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface DashboardProps {
  orders: ServiceOrder[];
  clients: Client[];
}

export const Dashboard: React.FC<DashboardProps> = ({ orders, clients }) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.value, 0);
  const averageTicket = orders.length > 0 ? totalRevenue / orders.length : 0;

  const statusCounts = {
    Aprovado: orders.filter(o => o.status === 'Aprovado' || o.status === 'Em Andamento').length,
    Concluido: orders.filter(o => o.status === 'Concluído').length,
    Aguardando: orders.filter(o => o.status === 'Aguardando Aprovação').length,
    Recusado: orders.filter(o => o.status === 'Recusado' || o.status === 'Cancelado').length,
  };

  const doughnutData = {
    labels: ['Em Andamento / Aprovado', 'Concluído', 'Aguardando Aprovação', 'Recusado / Cancelado'],
    datasets: [
      {
        data: [statusCounts.Aprovado, statusCounts.Concluido, statusCounts.Aguardando, statusCounts.Recusado],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: clients.map(c => c.name.split(' ')[0]),
    datasets: [
      {
        label: 'Total Investido (R$)',
        data: clients.map(c => c.totalSpent),
        backgroundColor: '#d97706',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard__grid">
        <div className="dashboard__card">
          <div className="dashboard__card-title">Faturamento Total</div>
          <div className="dashboard__card-value">
            {totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <div className="dashboard__card-change dashboard__card-change--positive">+18% este mês</div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-title">Ticket Médio</div>
          <div className="dashboard__card-value">
            {averageTicket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
          <div className="dashboard__card-change dashboard__card-change--positive">+5.4%</div>
        </div>

        <div className="dashboard__card">
          <div className="dashboard__card-title">Clientes Ativos</div>
          <div className="dashboard__card-value">{clients.length}</div>
          <div className="dashboard__card-change dashboard__card-change--neutral">Base em crescimento</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="dashboard__card" style={{ height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Status de Ordens de Serviço</h4>
          <div style={{ width: '80%', height: '80%' }}>
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="dashboard__card" style={{ height: '320px' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Top Clientes por Faturamento</h4>
          <div style={{ width: '100%', height: '80%' }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Dicas & Insights Operacionais</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div className="dashboard__card" style={{ borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#d97706', fontWeight: 'bold' }}>
            <Lightbulb size={20} /> Rapidez na Aprovação
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            O.S. enviadas via Portal com link direto têm tempo de resposta 35% menor.
          </p>
        </div>

        <div className="dashboard__card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#10b981', fontWeight: 'bold' }}>
            <TrendingUp size={20} /> Retenção de Clientes
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Programe revisões preventivas para clientes sem serviços nos últimos 60 dias.
          </p>
        </div>

        <div className="dashboard__card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#ef4444', fontWeight: 'bold' }}>
            <ShieldAlert size={20} /> Transparência nos Laudos
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Descrições técnicas minuciosas reduzem em 80% o índice de contestação de orçamentos.
          </p>
        </div>
      </div>
    </div>
  );
};
