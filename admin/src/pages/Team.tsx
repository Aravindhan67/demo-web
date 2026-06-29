import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Team: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    navigate('/team/new');
  };

  const handleOpenEdit = (m: any) => {
    navigate(`/team/edit/${m._id}`, { state: { member: m } });
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
    </Container>
  );
};

export default Team;
