import React, { useEffect, useState } from 'react';
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
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
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

const TextArea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  min-height: 80px;
  resize: vertical;
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

const DynamicFaIcon = ({ name }: { name: string }) => {
  const IconComponent = (FaIcons as any)[name];
  if (!IconComponent) return <FaIcons.FaQuestion />;
  return <IconComponent />;
};

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('FaCode');
  const [description, setDescription] = useState('');
  const [createdDate, setCreatedDate] = useState('');

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
    setEditingId(null);
    setName('');
    setIcon('FaCode');
    setDescription('');
    setCreatedDate(new Date().toISOString().substring(0, 10));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (serv: any) => {
    setEditingId(serv._id);
    setName(serv.name);
    setIcon(serv.icon);
    setDescription(serv.description);
    setCreatedDate(serv.createdDate ? serv.createdDate.substring(0, 10) : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete('services', id);
      fetchServices();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, icon, description, createdDate };

    try {
      if (editingId) {
        await api.update('services', editingId, payload);
      } else {
        await api.create('services', payload);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      alert('Save failed');
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
          {services.map((serv) => (
            <GlassCard key={serv._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(serv)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(serv._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              <IconPreview>
                <DynamicFaIcon name={serv.icon} />
              </IconPreview>
              <ServiceTitle>{serv.name}</ServiceTitle>
              <ServiceDesc>{serv.description}</ServiceDesc>
              <MetaInfo>
                <span>Created: {new Date(serv.createdDate).toLocaleDateString()}</span>
              </MetaInfo>
            </GlassCard>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Service details' : 'Add New Service'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Service Name</Label>
                <Input type="text" value={name} onChange={e => setName(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Service Icon (FontAwesome name, e.g. FaCode, FaPaintBrush, FaBullhorn)</Label>
                <Input type="text" value={icon} onChange={e => setIcon(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea value={description} onChange={e => setDescription(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Created Date</Label>
                <Input type="date" value={createdDate} onChange={e => setCreatedDate(e.target.value)} />
              </FormGroup>
              <SaveButton type="submit">Save Service</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Services;
