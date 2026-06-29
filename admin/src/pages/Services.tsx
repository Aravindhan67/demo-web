import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
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

const ServiceTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`;

const ServiceDesc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const IconPreview = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.sidebarActiveBg};
`;

const DynamicFaIcon = ({ name }: { name: string }) => {
  const IconComponent = (FaIcons as any)[name];
  if (!IconComponent) return <FaIcons.FaQuestion />;
  return <IconComponent />;
};

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const data = await api.list('services');
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    navigate('/services/new');
  };

  const handleOpenEdit = (srv: any) => {
    navigate(`/services/edit/${srv._id}`, { state: { service: srv } });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete('services', id);
      fetchServices();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Services Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Service
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading services...</div>
      ) : (
        <Grid>
          {services.map((srv) => (
            <GlassCard key={srv._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(srv)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(srv._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              
              <IconPreview>
                <DynamicFaIcon name={srv.icon} />
              </IconPreview>
              
              <ServiceTitle>{srv.name}</ServiceTitle>
              <ServiceDesc>{srv.description}</ServiceDesc>
              
              <MetaInfo>
                <span>Created: {srv.createdDate ? new Date(srv.createdDate).toLocaleDateString() : 'N/A'}</span>
              </MetaInfo>
            </GlassCard>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Services;
