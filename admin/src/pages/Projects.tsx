import React, { useEffect, useState } from 'react';
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

const GlassCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textLight};
  font-weight: 600;
  font-size: 0.85rem;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 0.9rem;
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
`;

const Badge = styled.span<{ $status: string }>`
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $status }) => 
    $status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 
    $status === 'In Progress' ? 'rgba(245, 158, 11, 0.15)' : 
    'rgba(148, 163, 184, 0.15)'};
  color: ${({ $status, theme }) => 
    $status === 'Completed' ? theme.success : 
    $status === 'In Progress' ? theme.warning : 
    theme.textLight};
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button<{ $color: string }>`
  background: none;
  border: none;
  color: ${({ $color }) => $color};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;

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
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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
  gap: 1rem;
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

const Select = styled.select`
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
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectDate, setProjectDate] = useState('');
  const [status, setStatus] = useState('Completed');
  const [technologies, setTechnologies] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [galleryImages, setGalleryImages] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

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
    setEditingId(null);
    setTitle('');
    setCategory('');
    setDescription('');
    setClientName('');
    setProjectDate('');
    setStatus('Completed');
    setTechnologies('');
    setThumbnailImage('');
    setGalleryImages('');
    setProjectUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: any) => {
    setEditingId(proj._id);
    setTitle(proj.title);
    setCategory(proj.category);
    setDescription(proj.description);
    setClientName(proj.clientName || '');
    setProjectDate(proj.projectDate ? proj.projectDate.substring(0, 10) : '');
    setStatus(proj.status);
    setTechnologies(proj.technologiesUsed ? proj.technologiesUsed.join(', ') : '');
    setThumbnailImage(proj.thumbnailImage || '');
    setGalleryImages(proj.galleryImages ? proj.galleryImages.join(', ') : '');
    setProjectUrl(proj.projectUrl || '');
    setIsModalOpen(true);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await api.upload(formData);
      if (isThumbnail) {
        setThumbnailImage(res.url);
      } else {
        setGalleryImages(prev => prev ? `${prev}, ${res.url}` : res.url);
      }
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      category,
      description,
      clientName,
      projectDate,
      status,
      technologiesUsed: technologies.split(',').map(s => s.trim()).filter(Boolean),
      thumbnailImage,
      galleryImages: galleryImages.split(',').map(s => s.trim()).filter(Boolean),
      projectUrl
    };

    try {
      if (editingId) {
        await api.update('projects', editingId, payload);
      } else {
        await api.create('projects', payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert('Save failed');
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

      <GlassCard>
        {loading ? (
          <div>Loading projects...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Thumbnail</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Client</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj._id}>
                  <Td>
                    {proj.thumbnailImage ? (
                      <Thumbnail src={proj.thumbnailImage.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${proj.thumbnailImage}` : proj.thumbnailImage} alt={proj.title} />
                    ) : (
                      <div style={{ width: 48, height: 48, background: '#3b82f615', borderRadius: 8 }} />
                    )}
                  </Td>
                  <Td style={{ fontWeight: 600 }}>{proj.title}</Td>
                  <Td>{proj.category}</Td>
                  <Td>{proj.clientName || 'N/A'}</Td>
                  <Td>
                    <Badge $status={proj.status}>{proj.status}</Badge>
                  </Td>
                  <Td>
                    <ActionGroup>
                      <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(proj)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton $color="#ef4444" onClick={() => handleDelete(proj._id)}>
                        <FaTrash />
                      </IconButton>
                    </ActionGroup>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </GlassCard>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Project Title</Label>
                <Input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <Input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea value={description} onChange={e => setDescription(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Client Name</Label>
                <Input type="text" value={clientName} onChange={e => setClientName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Project Date</Label>
                <Input type="date" value={projectDate} onChange={e => setProjectDate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planned">Planned</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Technologies Used (comma separated)</Label>
                <Input type="text" value={technologies} onChange={e => setTechnologies(e.target.value)} placeholder="React, Node.js, Express" />
              </FormGroup>
              <FormGroup>
                <Label>Thumbnail Image Link / Upload</Label>
                <Input type="text" value={thumbnailImage} onChange={e => setThumbnailImage(e.target.value)} placeholder="https://..." />
                <Input type="file" onChange={e => handleFileUpload(e, true)} />
              </FormGroup>
              <FormGroup>
                <Label>Gallery Images (comma separated links) / Upload</Label>
                <Input type="text" value={galleryImages} onChange={e => setGalleryImages(e.target.value)} placeholder="https://..., https://..." />
                <Input type="file" onChange={e => handleFileUpload(e, false)} />
              </FormGroup>
              <FormGroup>
                <Label>Project URL</Label>
                <Input type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} placeholder="https://..." />
              </FormGroup>
              <SaveButton type="submit">Save Changes</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Projects;
