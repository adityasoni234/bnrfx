import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../../services/broker';
import mt5Service from '../../../services/mt5Service';

const MT5Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await dashboardService.getClients();
      if (response.success) {
        setClients(response.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading MT5 clients...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>MT5 Clients ({clients.length})</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {clients.map((client) => (
          <div key={client.login} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>#{client.login} - {client.name}</h3>
            <p>Email: {client.email}</p>
            <p>Group: {client.group}</p>
            <p>Balance: ${client.balance.toLocaleString()}</p>
            <p>Equity: ${client.equity.toLocaleString()}</p>
            <p>Open Positions: {client.open_positions}</p>
            <p>Status: {client.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MT5Clients;