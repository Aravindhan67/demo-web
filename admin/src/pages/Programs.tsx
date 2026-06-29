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

const ProgramTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 1.5rem;
`;

const MetaInfo = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Badge = styled.span<{ $kind?: string }>`
  padding: 0.25rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $kind }) => $kind === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  color: ${({ $kind }) => $kind === 'active' ? '#22c55e' : '#f59e0b'};
`;

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      const data = await api.list('programs');
      setPrograms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenAdd = () => {
    navigate('/programs/new');
  };

  const handleOpenEdit = (prog: any) => {
    navigate(`/programs/edit/${prog._id}`, { state: { program: prog } });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.delete('programs', id);
      fetchPrograms();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Programs Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Program
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading programs...</div>
      ) : (
        <Grid>
          {programs.map((prog) => (
            <GlassCard key={prog._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(prog)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(prog._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              <ProgramTitle>{prog.title}</ProgramTitle>
              <Badge $kind={prog.kind}>
                {prog.kind === 'active' ? 'Active' : 'Upcoming'}
              </Badge>
              <MetaInfo>
                <span>Launch: {prog.launch}</span>
                <span>Status: {prog.status}</span>
              </MetaInfo>
            </GlassCard>
          ))}
          {programs.length === 0 && (
            <div style={{ textAlign: 'center', color: '#888', gridColumn: '1 / -1' }}>
              No programs found. Add your first program to get started.
            </div>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Programs;
