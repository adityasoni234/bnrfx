import React, { useState, useEffect } from 'react';
import { FiPlus, FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
import '../../styles/Admin/SupportTickets.css';
import {
  getCurrentUser,
  createSupportTicket,
  getUserTickets,
  addTicketMessage
} from '../../lib/supabase/helpers';

function SupportTickets() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterPriority, setFilterPriority] = useState('All Priority');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    priority: 'medium',
    category: 'general',
    message: '',
    attachment: null
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      const userTickets = await getUserTickets(user.user.id);
      setTickets(userTickets || []);

    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setTicketForm({
      ...ticketForm,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login first');
      return;
    }

    setSubmitting(true);

    try {
      // Create ticket
      const ticket = await createSupportTicket({
        userId: currentUser.user.id,
        subject: ticketForm.subject,
        category: ticketForm.category,
        priority: ticketForm.priority
      });

      if (!ticket) {
        throw new Error('Failed to create ticket');
      }

      // Add initial message
      await addTicketMessage({
        ticketId: ticket.id,
        userId: currentUser.user.id,
        message: ticketForm.message,
        attachments: ticketForm.attachment ? [ticketForm.attachment.name] : []
      });

      alert('Ticket created successfully! Our support team will respond soon.');
      setShowCreateModal(false);
      
      // Reset form
      setTicketForm({
        subject: '',
        priority: 'medium',
        category: 'general',
        message: '',
        attachment: null
      });

      // Refresh tickets
      await fetchTickets();

    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };

  const handleAddMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return;

    try {
      await addTicketMessage({
        ticketId: selectedTicket.id,
        userId: currentUser.user.id,
        message: newMessage,
        attachments: []
      });

      setNewMessage('');
      
      // Refresh tickets to get updated messages
      await fetchTickets();
      
      // Update selected ticket
      const updatedTickets = await getUserTickets(currentUser.user.id);
      const updatedTicket = updatedTickets.find(t => t.id === selectedTicket.id);
      setSelectedTicket(updatedTicket);

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleClear = () => {
    setFilterStatus('All Status');
    setFilterPriority('All Priority');
  };

  const getStatusBadge = (status) => {
    const colors = {
      'open': '#10b981',
      'in_progress': '#f59e0b',
      'resolved': '#6366f1',
      'closed': '#6b7280'
    };

    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        backgroundColor: (colors[status] || '#6b7280') + '20',
        color: colors[status] || '#6b7280',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'low': '#10b981',
      'medium': '#f59e0b',
      'high': '#ef4444',
      'urgent': '#dc2626'
    };

    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        backgroundColor: (colors[priority] || '#6b7280') + '20',
        color: colors[priority] || '#6b7280',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        {priority}
      </span>
    );
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'All Status' || ticket.status === filterStatus.toLowerCase();
    const matchesPriority = filterPriority === 'All Priority' || ticket.priority === filterPriority.toLowerCase();
    return matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="support-tickets-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading support tickets...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="support-tickets-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to view support tickets</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="support-tickets-page">
      <div className="tickets-header">
        <div>
          <h1>Support Tickets</h1>
          <p>Create and manage your support requests.</p>
        </div>
        <button className="btn-create-ticket" onClick={() => setShowCreateModal(true)}>
          <FiPlus /> Create New Ticket
        </button>
      </div>

      <div className="tickets-container">
        {/* Filters */}
        <div className="tickets-filters">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <select
            className="filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option>All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>

          <button className="btn-clear" onClick={handleClear}>Clear</button>
        </div>

        {/* Ticket Details Section */}
        <div className="ticket-details-section">
          <div className="section-title-row">
            <h2>Ticket Details</h2>
          </div>

          {/* Tickets Table */}
          <div className="tickets-table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.ticket_number}</td>
                      <td>{ticket.subject}</td>
                      <td style={{ textTransform: 'capitalize' }}>{ticket.category}</td>
                      <td>{getPriorityBadge(ticket.priority)}</td>
                      <td>{getStatusBadge(ticket.status)}</td>
                      <td>{new Date(ticket.updated_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-view"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      You have not created any support tickets yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Ticket</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter ticket subject"
                  value={ticketForm.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority *</label>
                  <select
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="withdrawal">Withdrawal Issue</option>
                    <option value="deposit">Deposit Issue</option>
                    <option value="kyc">KYC Related</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Related</option>
                    <option value="trading">Trading Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Describe your issue in detail..."
                  value={ticketForm.message}
                  onChange={handleFormChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Attachment (Optional)</label>
                <input
                  type="file"
                  name="attachment"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFormChange}
                />
                <small>Max file size: 5MB. Supported formats: JPG, PNG, PDF, DOC</small>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Creating...' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Ticket Modal */}
      {showViewModal && selectedTicket && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <div>
                <h2>Ticket #{selectedTicket.ticket_number}</h2>
                <p style={{ marginTop: '5px', color: '#6b7280' }}>{selectedTicket.subject}</p>
              </div>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Ticket Info */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '15px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px'
              }}>
                <div>
                  <strong>Status:</strong> {getStatusBadge(selectedTicket.status)}
                </div>
                <div>
                  <strong>Priority:</strong> {getPriorityBadge(selectedTicket.priority)}
                </div>
                <div>
                  <strong>Category:</strong> {selectedTicket.category.toUpperCase()}
                </div>
                <div>
                  <strong>Created:</strong> {new Date(selectedTicket.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Messages */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>Messages</h3>
                <div style={{ 
                  maxHeight: '400px', 
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '15px'
                }}>
                  {selectedTicket.ticket_messages && selectedTicket.ticket_messages.length > 0 ? (
                    selectedTicket.ticket_messages.map((msg, index) => (
                      <div 
                        key={index}
                        style={{
                          padding: '12px',
                          marginBottom: '10px',
                          backgroundColor: msg.user_id === currentUser.user.id ? '#dbeafe' : '#f3f4f6',
                          borderRadius: '8px',
                          borderLeft: msg.user_id === currentUser.user.id ? '4px solid #3b82f6' : '4px solid #9ca3af'
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>
                          {msg.user_id === currentUser.user.id ? 'You' : 'Support Team'} - {new Date(msg.created_at).toLocaleString()}
                        </div>
                        <div>{msg.message}</div>
                      </div>
                    ))
                  ) : (
                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No messages yet</p>
                  )}
                </div>
              </div>

              {/* Add Message */}
              {selectedTicket.status !== 'closed' && (
                <div>
                  <h3 style={{ marginBottom: '10px' }}>Add Reply</h3>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}
                  ></textarea>
                  <button
                    onClick={handleAddMessage}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    <FiMessageSquare style={{ marginRight: '5px' }} />
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportTickets;