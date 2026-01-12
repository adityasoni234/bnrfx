import React from 'react';
import { FiMonitor, FiSmartphone } from 'react-icons/fi';
import { FaWindows, FaApple, FaAndroid, FaGlobe } from 'react-icons/fa';
import '../../styles/Admin/Download.css';

function Download() {
  const platforms = [
    {
      name: 'Windows',
      icon: <FaWindows size={48} />,
      description: 'Download MT5 for Windows Desktop',
      downloadUrl: '#'
    },
    {
      name: 'iOS',
      icon: <FaApple size={48} />,
      description: 'Download MT5 for iPhone & iPad',
      downloadUrl: '#'
    },
    {
      name: 'Android',
      icon: <FaAndroid size={48} />,
      description: 'Download MT5 for Android Devices',
      downloadUrl: '#'
    },
    {
      name: 'Web',
      icon: <FaGlobe size={48} />,
      description: 'Trade directly from your browser',
      downloadUrl: '#'
    }
  ];

  const handleDownload = (platform) => {
    alert(`Downloading MT5 for ${platform}...`);
  };

  return (
    <div className="download-page">
      <div className="download-header">
        <h1>Download for all Devices</h1>
        <p>Get MetaTrader 5 on all your devices and trade anywhere, anytime.</p>
      </div>

      <div className="platforms-grid">
        {platforms.map((platform, index) => (
          <div key={index} className="platform-card">
            <div className="platform-icon">{platform.icon}</div>
            <h3>{platform.name}</h3>
            <p>{platform.description}</p>
            <button
              className="btn-download"
              onClick={() => handleDownload(platform.name)}
            >
              Download
            </button>
          </div>
        ))}
      </div>

      <div className="download-info">
        <div className="info-section">
          <FiMonitor size={32} />
          <h3>Desktop Trading</h3>
          <p>
            Experience the full power of MetaTrader 5 with advanced charting,
            technical analysis tools, and automated trading capabilities.
          </p>
        </div>

        <div className="info-section">
          <FiSmartphone size={32} />
          <h3>Mobile Trading</h3>
          <p>
            Trade on the go with MT5 mobile apps. Monitor markets, manage positions,
            and execute trades from anywhere in the world.
          </p>
        </div>
      </div>

      <div className="system-requirements">
        <h3>System Requirements</h3>
        <div className="requirements-grid">
          <div className="requirement-item">
            <h4>Windows</h4>
            <ul>
              <li>Windows 7 or later</li>
              <li>1 GHz processor or faster</li>
              <li>512 MB RAM minimum</li>
              <li>Internet connection</li>
            </ul>
          </div>

          <div className="requirement-item">
            <h4>macOS</h4>
            <ul>
              <li>macOS 10.10 or later</li>
              <li>Intel processor</li>
              <li>512 MB RAM minimum</li>
              <li>Internet connection</li>
            </ul>
          </div>

          <div className="requirement-item">
            <h4>iOS</h4>
            <ul>
              <li>iOS 11.0 or later</li>
              <li>iPhone, iPad, iPod touch</li>
              <li>Internet connection</li>
            </ul>
          </div>

          <div className="requirement-item">
            <h4>Android</h4>
            <ul>
              <li>Android 5.0 or later</li>
              <li>Smartphone or tablet</li>
              <li>Internet connection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;