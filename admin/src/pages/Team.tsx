import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaLinkedin, FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa';
import { api } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
`;

const AddButton = styled.button`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
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
  align-items: center;
  text-align: center;
  gap: 1rem;
  position: relative;
`;

const ProfilePhoto = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.primary};
`;

const Name = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`;

const Designation = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  margin-top: -0.5rem;
`;

const MetaInfo = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.textLight};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CardActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.25rem;
`;

const IconButton = styled.button<{ $color: string }>`
  background: none;
  border: none;
  color: ${({ $color }) => $color};
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const SaveButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const Team: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [employeeName, setEmployeeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [facebook, setFacebook] = useState('');

  const fetchTeam = async () => {
    try {
      const data = await api.list('team');
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setEmployeeName('');
    setDesignation('');
    setEmail('');
    setMobileNumber('');
    setJoiningDate(new Date().toISOString().substring(0, 10));
    setProfilePhoto('');
    setLinkedin('');
    setTwitter('');
    setGithub('');
    setFacebook('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: any) => {
    setEditingId(m._id);
    setEmployeeName(m.employeeName);
    setDesignation(m.designation);
    setEmail(m.email);
    setMobileNumber(m.mobileNumber || '');
    setJoiningDate(m.joiningDate ? m.joiningDate.substring(0, 10) : '');
    setProfilePhoto(m.profilePhoto || '');
    setLinkedin(m.socialMediaLinks?.linkedin || '');
    setTwitter(m.socialMediaLinks?.twitter || '');
    setGithub(m.socialMediaLinks?.github || '');
    setFacebook(m.socialMediaLinks?.facebook || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this team member?')) return;
    try {
      await api.delete('team', id);
      fetchTeam();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.upload(formData);
      setProfilePhoto(res.url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      employeeName,
      designation,
      email,
      mobileNumber,
      joiningDate,
      profilePhoto,
      socialMediaLinks: { linkedin, twitter, github, facebook }
    };

    try {
      if (editingId) {
        await api.update('team', editingId, payload);
      } else {
        await api.create('team', payload);
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Team Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Member
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading team members...</div>
      ) : (
        <Grid>
          {members.map((m) => (
            <GlassCard key={m._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(m)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(m._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              <ProfilePhoto src={m.profilePhoto?.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${m.profilePhoto}` : m.profilePhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'} alt={m.employeeName} />
              <Name>{m.employeeName}</Name>
              <Designation>{m.designation}</Designation>
              <MetaInfo>
                <span>{m.email}</span>
                <span>{m.mobileNumber || 'No phone number'}</span>
                <span>Joined: {new Date(m.joiningDate).toLocaleDateString()}</span>
              </MetaInfo>
              <SocialIcons>
                {m.socialMediaLinks?.linkedin && (
                  <SocialLink href={m.socialMediaLinks.linkedin} target="_blank"><FaLinkedin /></SocialLink>
                )}
                {m.socialMediaLinks?.twitter && (
                  <SocialLink href={m.socialMediaLinks.twitter} target="_blank"><FaTwitter /></SocialLink>
                )}
                {m.socialMediaLinks?.github && (
                  <SocialLink href={m.socialMediaLinks.github} target="_blank"><FaGithub /></SocialLink>
                )}
                {m.socialMediaLinks?.facebook && (
                  <SocialLink href={m.socialMediaLinks.facebook} target="_blank"><FaFacebook /></SocialLink>
                )}
              </SocialIcons>
            </GlassCard>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Team Member Details' : 'Add Team Member'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Employee Name</Label>
                <Input type="text" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Designation</Label>
                <Input type="text" value={designation} onChange={e => setDesignation(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Profile Photo URL / Upload</Label>
                <Input type="text" value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} placeholder="https://..." />
                <Input type="file" onChange={handleFileUpload} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Mobile Number</Label>
                <Input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Joining Date</Label>
                <Input type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} />
              </FormGroup>
              
              <h4 style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>Social Media Links</h4>
              <FormGroup>
                <Label>LinkedIn</Label>
                <Input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
              </FormGroup>
              <FormGroup>
                <Label>Twitter</Label>
                <Input type="url" value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
              </FormGroup>
              <FormGroup>
                <Label>GitHub</Label>
                <Input type="url" value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..." />
              </FormGroup>
              <FormGroup>
                <Label>Facebook</Label>
                <Input type="url" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
              </FormGroup>

              <SaveButton type="submit">Save Member</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Team;
