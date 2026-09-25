import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ServiceOrder, Client } from '../types';

interface NewOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOS: (os: Omit<ServiceOrder, 'id' | 'createdAt'>) => void;
  clients: Client[];
}

export const NewOSModal: React.FC<NewOSModalProps> = ({ isOpen, onClose, onAddOS, clients }) => {
  const [clientName, setClientName] = useState(clients[0]?.name || '');
  const [clientPhone, setClientPhone] = useState(clients[0]?.phone || '');
  const [serviceType, setServiceType] = useState('Manutenção');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [estimatedCompletion, setEstimatedCompletion] = useState('');

  if (!isOpen) return null;

  const handleClientSelect = (selectedName: string) => {
    setClientName(selectedName);
    const client = clients.find(c => c.name === selectedName);
    if (client) setClientPhone(client.phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOS({
      clientName,
      clientPhone,
      serviceType,
      description,
      value: Number(value),
      status: 'Aguardando Aprovação',
      estimatedCompletion,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h3>Criar Nova Ordem de Serviço</h3>
          <button className="btn btn--outline" onClick={onClose} style={{ padding: '0.2rem' }}>
            <X size={18} />
          </button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label>
            Cliente:
            <select value={clientName} onChange={e => handleClientSelect(e.target.value)}>
              {clients.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Telefone:
            <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
          </label>
          <label>
            Tipo de Serviço:
            <input type="text" value={serviceType} onChange={e => setServiceType(e.target.value)} required />
          </label>
          <label>
            Descrição:
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} required />
          </label>
          <label>
            Valor (R$):
            <input type="number" value={value} onChange={e => setValue(e.target.value)} required />
          </label>
          <label>
            Previsão de Conclusão:
            <input type="date" value={estimatedCompletion} onChange={e => setEstimatedCompletion(e.target.value)} required />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn--primary">Salvar O.S.</button>
          </div>
        </form>
      </div>
    </div>
  );
};
