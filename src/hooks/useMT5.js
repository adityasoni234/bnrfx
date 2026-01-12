import { useState, useEffect, useCallback, useRef } from 'react';
import mt5Service from '../services/mt5Service';

export const useMT5Connection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const autoConnect = async () => {
      try {
        setLoading(true);
        setError(null);
        await mt5Service.autoConnect();
        setIsConnected(true);
      } catch (err) {
        setError(err.message);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };
    autoConnect();
  }, []);

  const checkConnection = useCallback(async () => {
    try {
      const response = await mt5Service.ping();
      setIsConnected(response.connected);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    }
  }, []);

  return { isConnected, loading, error, checkConnection };
};

export const useMT5Account = (login = 28000) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchAccount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.getAccount(login);
      setAccount(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [login]);

  useEffect(() => {
    fetchAccount();
    
    // Real-time updates every 5 seconds
    intervalRef.current = setInterval(fetchAccount, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchAccount]);

  return { account, loading, error, refetch: fetchAccount };
};

export const useMT5Operations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.createUser(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (login = 28000, amount, comment) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.deposit(login, amount, comment);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (login = 28000, amount, comment) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.withdraw(login, amount, comment);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, deposit, withdraw, loading, error };
};

export const useMT5Positions = (login = 28000) => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.getPositions(login);
      setPositions(response.positions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [login]);

  useEffect(() => {
    fetchPositions();
    
    // Real-time updates every 3 seconds
    intervalRef.current = setInterval(fetchPositions, 3000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchPositions]);

  return { positions, loading, error, refetch: fetchPositions };
};

export const useMT5History = (login = 28000, fromDate, toDate) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (!fromDate || !toDate) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await mt5Service.getHistory(login, fromDate, toDate);
      setHistory(response.deals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [login, fromDate, toDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, error, refetch: fetchHistory };
};

// Real-time data hook
export const useMT5RealTime = (login = 28000) => {
  const [data, setData] = useState({ account: null, positions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await mt5Service.refreshData(login);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [login]);

  useEffect(() => {
    refreshData();
    
    // Real-time updates every 2 seconds
    intervalRef.current = setInterval(refreshData, 2000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshData]);

  return {
    account: data.account,
    positions: data.positions,
    loading,
    error,
    refresh: refreshData
  };
};