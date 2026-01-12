import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdVisibility,
  MdClose,
  MdSend,
  MdRefresh,
  MdWarning,
  MdInfo,
  MdCheckCircle
} from 'react-icons/md';
import './TicketsList.css';
import { getAllSupportTickets, addTicketMessage, updateTicketStatus } from '../../../lib/supabase/helpers';

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getAllSupportTickets();
      
      const formattedTickets = data.map(ticket => ({
        id: ticket.id,
        userId: ticket.user_id,
        userName: `${ticket.profiles?.first_name} ${ticket.profiles?.last_name}`,
        userEmail: ticket.profiles?.email,
        subject: ticket.subject,
        category: ticket.category?.toUpperCase() || 'GENERAL',
        priority: ticket.priority?.toUpperCase() || 'MEDIUM',
        status: ticket.status?.toUpperCase() || 'OPEN',
        createdAt: new Date(ticket.created_at),
        updatedAt: ticket.updated_at ? new Date(ticket.updated_at) : new Date(ticket.created_at),
        assignedTo: ticket.assigned_to,
        messages: (ticket.ticket_messages || []).map(msg => ({
          id: msg.id,
          userId: msg.user_id,
          message: msg.message,
          attachments: msg.attachments || [],
          createdAt: new Date(msg.created_at),
          isAdmin: msg.is_admin || false
        })).sort((a, b) => a.createdAt - b.createdAt),
        messageCount: ticket.ticket_messages?.length || 0
      }));

      setTickets(formattedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    setReplyMessage('');
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    try {
      // For now, we'll use a hardcoded admin user ID
      // In production, get this from the current logged-in admin
      const adminUserId = 'admin-user-id'; // Replace with actual admin user ID
      
      await addTicketMessage({
        ticketId: selectedTicket.id,
        userId: adminUserId,
        message: replyMessage,
        attachments: []
      });

      // Update ticket status to in_progress if it was open
      if (selectedTicket.status === 'OPEN') {
        await updateTicketStatus(selectedTicket.id, 'in_progress');
      }

      await fetchTickets();
      setReplyMessage('');
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  const handleCloseTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to close this ticket?')) {
      try {
        await updateTicketStatus(ticketId, 'resolved');
        await fetchTickets();
        setShowModal(false);
        alert('Ticket closed successfully!');
      } catch (error) {
        console.error('Error closing ticket:', error);
        alert('Failed to close ticket');
      }
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    resolved: tickets.filter(t => t.status === 'RESOLVED').length,
    highPriority: tickets.filter(t => t.priority === 'HIGH').length
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="tickets-container">
      {/* Stats Cards */}
      <div className="ticket-stats">
        <div className="stat-card-small open">
          <div className="stat-icon">📨</div>
          <div className="stat-info">
            <p>Open Tickets</p>
            <h3>{stats.open}</h3>
          </div>
        </div>
        <div className="stat-card-small progress">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p>In Progress</p>
            <h3>{stats.inProgress}</h3>
          </div>
        </div>
        <div className="stat-card-small resolved">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p>Resolved</p>
            <h3>{stats.resolved}</h3>
          </div>
        </div>
        <div className="stat-card-small high-priority">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <p>High Priority</p>
            <h3>{stats.highPriority}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="tickets-header">
        <div>
          <h1>Support Tickets</h1>
          <p>Manage client support requests</p>
        </div>
        <button className="btn btn-primary" onClick={fetchTickets}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="tickets-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredTickets.length} of {tickets.length} tickets</p>
      </div>

      {/* Tickets Table */}
      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Client</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Messages</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No tickets found
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <span className="ticket-id">#{ticket.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{ticket.userName}</div>
                      <div className="client-email">{ticket.userEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span className="ticket-subject">{ticket.subject}</span>
                  </td>
                  <td>
                    <span className="category-badge">{ticket.category}</span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`}>
                      {ticket.priority === 'HIGH' && <MdWarning size={14} />}
                      {ticket.priority === 'MEDIUM' && <MdInfo size={14} />}
                      {ticket.priority === 'LOW' && <MdCheckCircle size={14} />}
                      {ticket.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${ticket.status.toLowerCase().replace('_', '-')}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className="message-count">{ticket.messageCount} messages</span>
                  </td>
                  <td>{ticket.createdAt.toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Ticket"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {ticket.status !== 'RESOLVED' && (
                        <button 
                          className="btn-icon btn-close" 
                          title="Close Ticket"
                          onClick={() => handleCloseTicket(ticket.id)}
                        >
                          <MdClose size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn btn-secondary" disabled>Previous</button>
        <span>Page 1 of 1</span>
        <button className="btn btn-secondary" disabled>Next</button>
      </div>

      {/* Ticket Details Modal */}
      {showModal && selectedTicket && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large ticket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Ticket #{selectedTicket.id.substring(0, 8)}</h2>
                <p className="ticket-subject-modal">{selectedTicket.subject}</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="ticket-info-bar">
              <div className="ticket-info-item">
                <strong>Client:</strong> {selectedTicket.userName}
              </div>
              <div className="ticket-info-item">
                <strong>Category:</strong> {selectedTicket.category}
              </div>
              <div className="ticket-info-item">
                <strong>Priority:</strong>
                <span className={`priority-badge priority-${selectedTicket.priority.toLowerCase()}`}>
                  {selectedTicket.priority}
                </span>
              </div>
              <div className="ticket-info-item">
                <strong>Status:</strong>
                <span className={`status-badge status-${selectedTicket.status.toLowerCase().replace('_', '-')}`}>
                  {selectedTicket.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="modal-body ticket-conversation">
              <h3>Conversation</h3>
              <div className="messages-container">
                {selectedTicket.messages.length === 0 ? (
                  <p className="no-messages">No messages yet</p>
                ) : (
                  selectedTicket.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.isAdmin ? 'admin-message' : 'user-message'}`}
                    >
                      <div className="message-header">
                        <span className="message-sender">
                          {message.isAdmin ? 'Admin' : selectedTicket.userName}
                        </span>
                        <span className="message-time">
                          {message.createdAt.toLocaleString()}
                        </span>
                      </div>
                      <div className="message-content">
                        {message.message}
                      </div>
                      {message.attachments.length > 0 && (
                        <div className="message-attachments">
                          {message.attachments.map((att, idx) => (
                            <a key={idx} href={att} target="_blank" rel="noopener noreferrer">
                              Attachment {idx + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {selectedTicket.status !== 'RESOLVED' && (
                <div className="reply-section">
                  <h4>Send Reply</h4>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    rows="4"
                  />
                  <div className="reply-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                    >
                      <MdSend size={20} />
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {selectedTicket.status !== 'RESOLVED' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleCloseTicket(selectedTicket.id)}
                >
                  <MdCheckCircle size={20} />
                  Close Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}