const mockMT5Data = {
  accounts: [
    {
      login: 12345,
      name: 'John Doe',
      email: 'john@example.com',
      group: 'Standard',
      leverage: 100,
      balance: 10000,
      equity: 10500,
      margin: 2000,
      status: 'ACTIVE',
      created_at: new Date('2024-01-15')
    },
    {
      login: 12346,
      name: 'Jane Smith',
      email: 'jane@example.com',
      group: 'VIP',
      leverage: 200,
      balance: 25000,
      equity: 26500,
      margin: 5000,
      status: 'ACTIVE',
      created_at: new Date('2024-01-10')
    },
    {
      login: 12347,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      group: 'Standard',
      leverage: 100,
      balance: 5000,
      equity: 4800,
      margin: 1200,
      status: 'ACTIVE',
      created_at: new Date('2024-01-20')
    },
    {
      login: 280011,
      name: 'Real Account',
      email: 'real@example.com',
      group: 'Standard',
      leverage: 100,
      balance: 15000,
      equity: 15250,
      margin: 3000,
      status: 'ACTIVE',
      created_at: new Date()
    },
    {
      login: 28000,
      name: 'Manager Account (91.243.176.38)',
      email: 'manager@mt5.com',
      group: 'Manager',
      leverage: 500,
      balance: 50000,
      equity: 52500,
      margin: 10000,
      status: 'ACTIVE',
      created_at: new Date(),
      server: '91.243.176.38',
      note: 'Mock data - Real API requires official MT5 Manager SDK'
    }
  ],

  transactions: [
    {
      id: 1,
      mt5Login: 12345,
      type: 'DEPOSIT',
      amount: 10000,
      comment: 'Initial deposit',
      ticket: 100001,
      status: 'COMPLETED',
      createdAt: new Date('2024-01-15'),
      mt5Account: { name: 'John Doe' }
    },
    {
      id: 2,
      mt5Login: 12346,
      type: 'DEPOSIT',
      amount: 25000,
      comment: 'VIP account funding',
      ticket: 100002,
      status: 'COMPLETED',
      createdAt: new Date('2024-01-10'),
      mt5Account: { name: 'Jane Smith' }
    },
    {
      id: 3,
      mt5Login: 12347,
      type: 'DEPOSIT',
      amount: 5000,
      comment: 'Standard deposit',
      ticket: 100003,
      status: 'COMPLETED',
      createdAt: new Date('2024-01-20'),
      mt5Account: { name: 'Mike Johnson' }
    }
  ],

  positions: [
    {
      ticket: 200001,
      mt5Login: 12345,
      symbol: 'EURUSD',
      type: 'BUY',
      volume: 0.1,
      openPrice: 1.0850,
      currentPrice: 1.0875,
      profit: 25.00,
      swap: 0,
      commission: -2.00,
      status: 'OPEN',
      openTime: new Date()
    },
    {
      ticket: 200002,
      mt5Login: 12346,
      symbol: 'GBPUSD',
      type: 'SELL',
      volume: 0.2,
      openPrice: 1.2650,
      currentPrice: 1.2620,
      profit: 60.00,
      swap: -1.50,
      commission: -4.00,
      status: 'OPEN',
      openTime: new Date()
    }
  ]
};

module.exports = mockMT5Data;