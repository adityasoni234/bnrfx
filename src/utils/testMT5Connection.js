import mt5Service from '../services/mt5Service';

export const testMT5Connection = async () => {
  try {
    console.log('🔄 Testing MT5 connection...');
    
    // Test ping
    const pingResponse = await mt5Service.ping();
    console.log('✅ Ping successful:', pingResponse);
    
    // Test account info
    const accountResponse = await mt5Service.getAccount(12345);
    console.log('✅ Account info:', accountResponse);
    
    // Test positions
    const positionsResponse = await mt5Service.getPositions(12345);
    console.log('✅ Positions:', positionsResponse);
    
    return {
      success: true,
      results: {
        ping: pingResponse,
        account: accountResponse,
        positions: positionsResponse
      }
    };
  } catch (error) {
    console.error('❌ MT5 connection test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Run test if called directly
if (typeof window !== 'undefined') {
  window.testMT5Connection = testMT5Connection;
}