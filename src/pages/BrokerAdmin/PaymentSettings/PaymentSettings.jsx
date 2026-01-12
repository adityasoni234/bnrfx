import React, { useState, useEffect } from 'react';
import { 
  MdSave, 
  MdCloudUpload, 
  MdDelete,
  MdEdit,
  MdImage
} from 'react-icons/md';
import './PaymentSettings.css';
import { supabase } from '../../../lib/supabase/client';

export default function PaymentSettings() {
  const [settings, setSettings] = useState({
    upi: {
      enabled: true,
      upi_id: '',
      qr_code_url: ''
    },
    bank: {
      enabled: true,
      account_name: '',
      account_number: '',
      ifsc_code: '',
      bank_name: '',
      branch: ''
    },
    usdt: {
      enabled: false,
      wallet_address: '',
      qr_code_url: '',
      network: 'TRC20'
    },
    hawala: {
      enabled: false,
      cities: [],
      companies: []
    }
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('broker_payment_settings')
        .select('*')
        .single();

      if (data) {
        setSettings(data.settings || settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleFileUpload = async (file, type) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-qr-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-qr-codes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment-qr-codes')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload QR code');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleQRUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const url = await handleFileUpload(file, type);
    if (url) {
      setSettings(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          qr_code_url: url
        }
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const { data, error } = await supabase
        .from('broker_payment_settings')
        .upsert({
          id: 1,
          settings: settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      alert('✅ Payment settings saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('❌ Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="payment-settings-container">
      <div className="settings-header">
        <div>
          <h1>Payment Settings</h1>
          <p>Configure payment methods for client deposits</p>
        </div>
        <button 
          className="btn-save-settings" 
          onClick={handleSave}
          disabled={saving}
        >
          <MdSave size={20} />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      <div className="settings-grid">
        
        {/* UPI Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>💳 UPI Payment</h3>
            <label className="toggle-switch">
              <input 
                type="checkbox"
                checked={settings.upi.enabled}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  upi: { ...prev.upi, enabled: e.target.checked }
                }))}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.upi.enabled && (
            <div className="card-content">
              <div className="form-group">
                <label>UPI ID *</label>
                <input
                  type="text"
                  value={settings.upi.upi_id}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    upi: { ...prev.upi, upi_id: e.target.value }
                  }))}
                  placeholder="yourname@paytm"
                />
              </div>

              <div className="form-group">
                <label>QR Code *</label>
                {settings.upi.qr_code_url ? (
                  <div className="qr-preview">
                    <img src={settings.upi.qr_code_url} alt="UPI QR" />
                    <button 
                      className="btn-remove-qr"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        upi: { ...prev.upi, qr_code_url: '' }
                      }))}
                    >
                      <MdDelete size={18} />
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="upload-qr-btn">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleQRUpload(e, 'upi')}
                      disabled={uploading}
                    />
                    <MdCloudUpload size={32} />
                    <span>{uploading ? 'Uploading...' : 'Upload QR Code'}</span>
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bank Transfer Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>🏦 Bank Transfer</h3>
            <label className="toggle-switch">
              <input 
                type="checkbox"
                checked={settings.bank.enabled}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  bank: { ...prev.bank, enabled: e.target.checked }
                }))}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.bank.enabled && (
            <div className="card-content">
              <div className="form-group">
                <label>Account Holder Name *</label>
                <input
                  type="text"
                  value={settings.bank.account_name}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bank: { ...prev.bank, account_name: e.target.value }
                  }))}
                  placeholder="RhynoFX Trading Pvt Ltd"
                />
              </div>

              <div className="form-group">
                <label>Account Number *</label>
                <input
                  type="text"
                  value={settings.bank.account_number}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bank: { ...prev.bank, account_number: e.target.value }
                  }))}
                  placeholder="1234567890"
                />
              </div>

              <div className="form-group">
                <label>IFSC Code *</label>
                <input
                  type="text"
                  value={settings.bank.ifsc_code}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bank: { ...prev.bank, ifsc_code: e.target.value }
                  }))}
                  placeholder="HDFC0001234"
                />
              </div>

              <div className="form-group">
                <label>Bank Name *</label>
                <input
                  type="text"
                  value={settings.bank.bank_name}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bank: { ...prev.bank, bank_name: e.target.value }
                  }))}
                  placeholder="HDFC Bank"
                />
              </div>

              <div className="form-group">
                <label>Branch</label>
                <input
                  type="text"
                  value={settings.bank.branch}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bank: { ...prev.bank, branch: e.target.value }
                  }))}
                  placeholder="Mumbai Main Branch"
                />
              </div>
            </div>
          )}
        </div>

        {/* USDT Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>₿ USDT Crypto</h3>
            <label className="toggle-switch">
              <input 
                type="checkbox"
                checked={settings.usdt.enabled}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  usdt: { ...prev.usdt, enabled: e.target.checked }
                }))}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.usdt.enabled && (
            <div className="card-content">
              <div className="form-group">
                <label>Network</label>
                <select
                  value={settings.usdt.network}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    usdt: { ...prev.usdt, network: e.target.value }
                  }))}
                >
                  <option value="TRC20">TRC20 (Tron)</option>
                  <option value="ERC20">ERC20 (Ethereum)</option>
                  <option value="BEP20">BEP20 (BSC)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Wallet Address *</label>
                <input
                  type="text"
                  value={settings.usdt.wallet_address}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    usdt: { ...prev.usdt, wallet_address: e.target.value }
                  }))}
                  placeholder="TXxx...xxxx"
                />
              </div>

              <div className="form-group">
                <label>QR Code *</label>
                {settings.usdt.qr_code_url ? (
                  <div className="qr-preview">
                    <img src={settings.usdt.qr_code_url} alt="USDT QR" />
                    <button 
                      className="btn-remove-qr"
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        usdt: { ...prev.usdt, qr_code_url: '' }
                      }))}
                    >
                      <MdDelete size={18} />
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="upload-qr-btn">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleQRUpload(e, 'usdt')}
                      disabled={uploading}
                    />
                    <MdCloudUpload size={32} />
                    <span>{uploading ? 'Uploading...' : 'Upload QR Code'}</span>
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hawala Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>🤝 Hawala</h3>
            <label className="toggle-switch">
              <input 
                type="checkbox"
                checked={settings.hawala.enabled}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  hawala: { ...prev.hawala, enabled: e.target.checked }
                }))}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.hawala.enabled && (
            <div className="card-content">
              <div className="info-box">
                <p>⚠️ Hawala deposits require manual verification</p>
              </div>
              
              <div className="form-group">
                <label>Available Cities (comma-separated)</label>
                <input
                  type="text"
                  value={settings.hawala.cities?.join(', ') || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    hawala: { 
                      ...prev.hawala, 
                      cities: e.target.value.split(',').map(c => c.trim())
                    }
                  }))}
                  placeholder="Mumbai, Delhi, Bangalore"
                />
              </div>

              <div className="form-group">
                <label>Approved Companies (comma-separated)</label>
                <input
                  type="text"
                  value={settings.hawala.companies?.join(', ') || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    hawala: { 
                      ...prev.hawala, 
                      companies: e.target.value.split(',').map(c => c.trim())
                    }
                  }))}
                  placeholder="Western Union, MoneyGram"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}