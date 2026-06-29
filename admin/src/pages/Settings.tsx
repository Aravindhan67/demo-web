import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSave } from 'react-icons/fa';
import { api } from '../services/api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FileInput = styled.input`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.borderColor};
  background: transparent;
  color: ${({ theme }) => theme.textLight};
  font-size: 0.85rem;
  width: 100%;
  cursor: pointer;

  &::file-selector-button {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: none;
    background: ${({ theme }) => theme.primary};
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-right: 1rem;
    transition: background 0.2s;
  }

  &::file-selector-button:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const TextArea = styled.textarea`
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  min-height: 100px;
  font-size: 0.9rem;
  resize: vertical;
  width: 100%;
`;

const PreviewImage = styled.img`
  max-width: 120px;
  max-height: 80px;
  object-fit: contain;
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBg};
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [footerContent, setFooterContent] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.getSettings();
        setLogoUrl(data.logoUrl || '');
        setFaviconUrl(data.faviconUrl || '');
        setCompanyName(data.companyName || '');
        setEmail(data.email || '');
        setPhoneNumber(data.phoneNumber || '');
        setAddress(data.address || '');
        setLinkedin(data.socialMediaLinks?.linkedin || '');
        setTwitter(data.socialMediaLinks?.twitter || '');
        setFacebook(data.socialMediaLinks?.facebook || '');
        setInstagram(data.socialMediaLinks?.instagram || '');
        setFooterContent(data.footerContent || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.upload(formData);
      if (field === 'logo') setLogoUrl(res.url);
      else setFaviconUrl(res.url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      logoUrl,
      faviconUrl,
      companyName,
      email,
      phoneNumber,
      address,
      socialMediaLinks: { linkedin, twitter, facebook, instagram },
      footerContent
    };

    try {
      await api.updateSettings(payload);
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading website settings...</div>;

  const getMediaUrl = (url: string) => url.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${url}` : url;

  return (
    <Form className="animated-fade" onSubmit={handleSubmit}>
      <Header>
        <Title>Website Settings</Title>
        <SaveButton type="submit">
          <FaSave /> Save Settings
        </SaveButton>
      </Header>

      <SettingsGrid>
        <GlassCard>
          <CardTitle>Brand Assets</CardTitle>
          <FormGroup>
            <Label>Company Name</Label>
            <Input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required placeholder="JAC MediaLand" />
          </FormGroup>
          <FormGroup>
            <Label>Logo Link / Upload</Label>
            <PreviewContainer>
              {logoUrl && <PreviewImage src={getMediaUrl(logoUrl)} alt="Logo" />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <Input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." />
                <FileInput type="file" accept="image/*" onChange={e => handleFileUpload(e, 'logo')} />
              </div>
            </PreviewContainer>
          </FormGroup>
          <FormGroup>
            <Label>Favicon Link / Upload</Label>
            <PreviewContainer>
              {faviconUrl && <PreviewImage src={getMediaUrl(faviconUrl)} alt="Favicon" style={{ maxWidth: '60px', maxHeight: '60px' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <Input type="text" value={faviconUrl} onChange={e => setFaviconUrl(e.target.value)} placeholder="https://..." />
                <FileInput type="file" accept="image/*" onChange={e => handleFileUpload(e, 'favicon')} />
              </div>
            </PreviewContainer>
          </FormGroup>
        </GlassCard>

        <GlassCard>
          <CardTitle>Contact Information</CardTitle>
          <FormGroup>
            <Label>Contact Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="info@company.com" />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+1 (555) 123-4567" />
          </FormGroup>
          <FormGroup>
            <Label>Company Address</Label>
            <Input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Street Name, City, Country" />
          </FormGroup>
        </GlassCard>

        <GlassCard>
          <CardTitle>Social Media Links</CardTitle>
          <FormGroup>
            <Label>LinkedIn</Label>
            <Input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/company/..." />
          </FormGroup>
          <FormGroup>
            <Label>Twitter</Label>
            <Input type="url" value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
          </FormGroup>
          <FormGroup>
            <Label>Facebook</Label>
            <Input type="url" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
          </FormGroup>
          <FormGroup>
            <Label>Instagram</Label>
            <Input type="url" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
          </FormGroup>
        </GlassCard>

        <GlassCard>
          <CardTitle>Global Footer</CardTitle>
          <FormGroup>
            <Label>Footer Content</Label>
            <TextArea value={footerContent} onChange={e => setFooterContent(e.target.value)} placeholder="Enter brief text to appear at the bottom of the website..." />
          </FormGroup>
        </GlassCard>
      </SettingsGrid>
    </Form>
  );
};

export default Settings;
