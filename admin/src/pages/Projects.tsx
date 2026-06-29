import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
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
  color: ${({ theme }) => theme.primaryText};
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  gap: 1rem;
  position: relative;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.5rem;
`;

const ProjectCategory = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const MetaInfo = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Badge = styled.span<{ $status: string }>`
  align-self: flex-start;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ $status, theme }) => 
    $status === 'Completed' ? `${theme.success}20` : 
    $status === 'In Progress' ? `${theme.warning}20` : `${theme.primary}20`};
  color: ${({ $status, theme }) => 
    $status === 'Completed' ? theme.success : 
    $status === 'In Progress' ? theme.warning : theme.primary};
`;

const CardActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.25rem;
  background: ${({ theme }) => theme.cardBg};
  padding: 0.25rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
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
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await api.list('projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    navigate('/projects/new');
  };

  const handleOpenEdit = (proj: any) => {
    navigate(`/projects/edit/${proj._id}`, { state: { project: proj } });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete('projects', id);
      fetchProjects();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Projects Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Project
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading projects...</div>
      ) : (
        <Grid>
          {projects.map((proj) => (
            <GlassCard key={proj._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(proj)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(proj._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              {proj.thumbnailImage ? (
                <ProjectImage src={proj.thumbnailImage.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${proj.thumbnailImage}` : proj.thumbnailImage} alt={proj.title} />
              ) : (
                <div style={{ width: '100%', height: 180, background: '#3b82f615', borderRadius: 12, border: '2px dashed #3b82f6' }} />
              )}
              <ProjectTitle>{proj.title}</ProjectTitle>
              <ProjectCategory>{proj.category}</ProjectCategory>
              <MetaInfo>
                <span>Client: {proj.clientName || 'N/A'}</span>
                <span>Date: {proj.projectDate ? new Date(proj.projectDate).toLocaleDateString() : 'N/A'}</span>
              </MetaInfo>
              <Badge $status={proj.status}>{proj.status}</Badge>
            </GlassCard>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Projects;
