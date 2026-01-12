import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiUpload } from 'react-icons/fi';
import '../../styles/Admin/Profile.css';
import { 
  getCurrentUser, 
  updateUserProfile,
  getUserKYCDocuments,
  uploadKYCDocument
} from '../../lib/supabase/helpers';
import { supabase } from '../../lib/supabase/client';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [kycDocuments, setKycDocuments] = useState([]);
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'India',
    mobile: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [kycFiles, setKycFiles] = useState({
    pan: null,
    aadhaar: null,
    selfie: null,
    address_proof: null
  });

  const [kycNumbers, setKycNumbers] = useState({
    pan: '',
    aadhaar: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);
      
      setProfileData({
        firstName: user.profile.first_name || '',
        lastName: user.profile.last_name || '',
        email: user.profile.email || '',
        country: user.profile.country || 'India',
        mobile: user.profile.phone || ''
      });

      // Fetch KYC documents
      const docs = await getUserKYCDocuments(user.user.id);
      setKycDocuments(docs || []);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleKycFileChange = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setKycFiles({
        ...kycFiles,
        [docType]: file
      });
    }
  };

  const handleKycNumberChange = (e) => {
    const { name, value } = e.target;
    setKycNumbers({
      ...kycNumbers,
      [name]: value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login first');
      return;
    }

    setSaving(true);

    try {
      await updateUserProfile(currentUser.user.id, {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        country: profileData.country,
        phone: profileData.mobile
      });

      alert('Profile updated successfully!');
      setIsEditing(false);
      await fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      alert('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleKycSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login first');
      return;
    }

    setSaving(true);

    try {
      const uploadPromises = [];

      // Upload PAN
      if (kycFiles.pan) {
        uploadPromises.push(
          uploadKYCDocument({
            userId: currentUser.user.id,
            documentType: 'pan',
            file: kycFiles.pan,
            documentNumber: kycNumbers.pan
          })
        );
      }

      // Upload Aadhaar
      if (kycFiles.aadhaar) {
        uploadPromises.push(
          uploadKYCDocument({
            userId: currentUser.user.id,
            documentType: 'aadhaar',
            file: kycFiles.aadhaar,
            documentNumber: kycNumbers.aadhaar
          })
        );
      }

      // Upload Selfie
      if (kycFiles.selfie) {
        uploadPromises.push(
          uploadKYCDocument({
            userId: currentUser.user.id,
            documentType: 'selfie',
            file: kycFiles.selfie,
            documentNumber: ''
          })
        );
      }

      // Upload Address Proof
      if (kycFiles.address_proof) {
        uploadPromises.push(
          uploadKYCDocument({
            userId: currentUser.user.id,
            documentType: 'proof_of_address',
            file: kycFiles.address_proof,
            documentNumber: ''
          })
        );
      }

      const results = await Promise.all(uploadPromises);
      const failed = results.filter(r => !r.success);

      if (failed.length > 0) {
        alert('Some documents failed to upload. Please try again.');
      } else {
        alert('KYC documents submitted successfully! We will verify them within 24-48 hours.');
        
        // Reset form
        setKycFiles({
          pan: null,
          aadhaar: null,
          selfie: null,
          address_proof: null
        });
        setKycNumbers({
          pan: '',
          aadhaar: ''
        });

        // Refresh KYC documents
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error uploading KYC:', error);
      alert('Failed to submit KYC documents. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading profile...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to view profile</h2>
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

  const getKycStatus = (docType) => {
    const doc = kycDocuments.find(d => d.document_type === docType);
    if (!doc) return 'not_submitted';
    return doc.status;
  };

  const getKycStatusBadge = (status) => {
    const badges = {
      'approved': { text: 'Approved', color: '#10b981' },
      'pending': { text: 'Pending Review', color: '#f59e0b' },
      'rejected': { text: 'Rejected', color: '#ef4444' },
      'not_submitted': { text: 'Not Submitted', color: '#6b7280' }
    };
    
    const badge = badges[status] || badges['not_submitted'];
    
    return (
      <span style={{ 
        padding: '4px 12px', 
        borderRadius: '12px', 
        fontSize: '12px',
        backgroundColor: badge.color + '20',
        color: badge.color,
        fontWeight: '600'
      }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your personal information, verification, and security.</p>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Update Password
        </button>
        <button
          className={`tab ${activeTab === 'kyc' ? 'active' : ''}`}
          onClick={() => setActiveTab('kyc')}
        >
          KYC Details
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <span>{profileData.firstName?.charAt(0) || 'U'}</span>
              </div>
              <h2>{profileData.firstName} {profileData.lastName}</h2>
              <p>{currentUser.profile.email}</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-actions">
                {!isEditing ? (
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit2 /> Edit Profile
                  </button>
                ) : (
                  <>
                    <button type="submit" className="btn-save" disabled={saving}>
                      <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setIsEditing(false);
                        fetchUserData();
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Password Tab */}
      {activeTab === 'password' && (
        <div className="profile-content">
          <div className="profile-card">
            <h3>Change Your Password</h3>
            <p className="section-description">
              Ensure your account is using a strong password to stay secure.
            </p>

            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 characters)"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KYC Details Tab */}
      {activeTab === 'kyc' && (
        <div className="profile-content">
          <div className="profile-card">
            <h3>KYC Verification</h3>
            <p className="section-description">
              Complete your KYC verification to unlock all features.
            </p>

            <div className="kyc-status">
              <div className={`status-badge ${currentUser.profile.kyc_status}`}>
                Overall Status: {getKycStatusBadge(currentUser.profile.kyc_status)}
              </div>
            </div>

            <form onSubmit={handleKycSubmit}>
              <div className="kyc-upload-section">
                <div className="upload-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label>PAN Card</label>
                    {getKycStatusBadge(getKycStatus('pan'))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="PAN Number (e.g., ABCDE1234F)"
                    value={kycNumbers.pan}
                    onChange={handleKycNumberChange}
                    name="pan"
                    style={{ marginBottom: '10px' }}
                  />
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleKycFileChange(e, 'pan')}
                  />
                </div>

                <div className="upload-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label>Aadhaar Card</label>
                    {getKycStatusBadge(getKycStatus('aadhaar'))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Aadhaar Number (12 digits)"
                    value={kycNumbers.aadhaar}
                    onChange={handleKycNumberChange}
                    name="aadhaar"
                    maxLength={12}
                    style={{ marginBottom: '10px' }}
                  />
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleKycFileChange(e, 'aadhaar')}
                  />
                </div>

                <div className="upload-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label>Selfie</label>
                    {getKycStatusBadge(getKycStatus('selfie'))}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleKycFileChange(e, 'selfie')}
                  />
                </div>

                <div className="upload-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <label>Proof of Address</label>
                    {getKycStatusBadge(getKycStatus('proof_of_address'))}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleKycFileChange(e, 'address_proof')}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={saving}>
                  <FiUpload /> {saving ? 'Uploading...' : 'Submit for Verification'}
                </button>
              </div>
            </form>

            {kycDocuments.length > 0 && (
              <div className="kyc-documents-list" style={{ marginTop: '30px' }}>
                <h4>Submitted Documents</h4>
                <table style={{ width: '100%', marginTop: '15px' }}>
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Document Number</th>
                      <th>Status</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kycDocuments.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.document_type.toUpperCase()}</td>
                        <td>{doc.document_number || 'N/A'}</td>
                        <td>{getKycStatusBadge(doc.status)}</td>
                        <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;