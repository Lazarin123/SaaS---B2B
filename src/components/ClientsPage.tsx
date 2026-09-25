import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';
import { Client } from '../types';

interface ClientsPageProps {
  clients: Client[];
  onAddClient: (client: Omit<Client, 'id' | 'totalOrders' | 'totalSpent'>) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
    } else {
      setEditingClient(null);
      setName('');
      setEmail('');
      setPhone('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      onEditClient({ ...editingClient, name, email, phone });
    } else {
      onAddClient({ name, email, phone });
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h3>Carteira de Clientes</h3>
        <button className="btn btn--primary" onClick={() => handleOpenModal()}>
          <UserPlus size={18} /> Adicionar Cliente
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Total O.S.</th>
              <th>Investimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.totalOrders}</td>
                <td>{c.totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn--outline" style={{ padding: '0.3rem' }} onClick={() => handleOpenModal(c)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn--outline" style={{ padding: '0.3rem', color: '#ef4444' }} onClick={() => onDeleteClient(c.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__header">
              <h3>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              <button className="btn btn--outline" onClick={() => setIsModalOpen(false)} style={{ padding: '0.2rem' }}>
                <X size={18} />
              </button>
            </div>
            <form className="modal__form" onSubmit={handleSubmit}>
              <label>
                Nome Completo:
                <input type="text" required value={name} onChange={e => setName(e.target.value)} />
              </label>
              <label>
                E-mail:
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <label>
                Telefone:
                <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn--secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn--primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
