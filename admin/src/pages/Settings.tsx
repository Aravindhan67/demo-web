import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
`;

const GlassCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  min-height: 80px;
  font-size: 0.9rem;
  resize: vertical;
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
  }
`;

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 60px;
  object-fit: contain;
  margin-top: 0.5rem;
  border-radius: 6px;
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
      await api.update('settings', '', payload);
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading website settings...</div>;

  return (
    <Container className="animated-fade">
      <Title>Website Settings</Title>
      
      <GlassCard>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <FormGroup>
              <Label>Logo Link / Upload</Label>
              <Input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." />
              <Input type="file" onChange={e => handleFileUpload(e, 'logo')} />
              {logoUrl && <PreviewImage src={logoUrl.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${logoUrl}` : logoUrl} />}
            </FormGroup>

            <FormGroup>
              <Label>Favicon Link / Upload</Label>
              <Input type="text" value={faviconUrl} onChange={e => setFaviconUrl(e.target.value)} placeholder="https://..." />
              <Input type="file" onChange={e => handleFileUpload(e, 'favicon')} />
              {faviconUrl && <PreviewImage src={faviconUrl.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${faviconUrl}` : faviconUrl} />}
            </FormGroup>

            <FormGroup>
              <Label>Company Name</Label>
              <Input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <Label>Contact Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number</Label>
              <Input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label>Company Address</Label>
              <Input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </FormGroup>
          </Grid>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '1rem' }}>Social Media Links</h3>
          <Grid>
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
          </Grid>

          <FormGroup>
            <Label>Footer Content</Label>
            <TextArea value={footerContent} onChange={e => setFooterContent(e.target.value)} />
          </FormGroup>

          <SaveButton type="submit">Update Settings</SaveButton>
        </Form>
      </GlassCard>
    </Container>
  );
};

export default Settings;
