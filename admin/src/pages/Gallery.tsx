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
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
`;

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textLight};
`;

const ActionGroup = styled.div`
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

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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

const Gallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [photoUrl, setPhotoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadDate, setUploadDate] = useState('');

  const fetchGallery = async () => {
    try {
      const data = await api.list('gallery');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setPhotoUrl('');
    setTitle('');
    setDescription('');
    setUploadDate(new Date().toISOString().substring(0, 10));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item._id);
    setPhotoUrl(item.photoUrl);
    setTitle(item.title);
    setDescription(item.description || '');
    setUploadDate(item.uploadDate ? new Date(item.uploadDate).toISOString().substring(0, 10) : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await api.delete('gallery', id);
      fetchGallery();
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
      setPhotoUrl(res.url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { photoUrl, title, description, uploadDate };

    try {
      if (editingId) {
        await api.update('gallery', editingId, payload);
      } else {
        await api.create('gallery', payload);
      }
      setIsModalOpen(false);
      fetchGallery();
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Gallery Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Photo
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading gallery...</div>
      ) : (
        <Grid>
          {items.map((item) => (
            <GlassCard key={item._id}>
              <CardImage src={item.photoUrl?.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${item.photoUrl}` : (item.photoUrl || '')} alt={item.title} />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardDesc>{item.description || 'No description provided.'}</CardDesc>
                <CardFooter>
                  <span>{item.uploadDate ? new Date(item.uploadDate).toLocaleDateString() : 'N/A'}</span>
                  <ActionGroup>
                    <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(item)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton $color="#ef4444" onClick={() => handleDelete(item._id)}>
                      <FaTrash />
                    </IconButton>
                  </ActionGroup>
                </CardFooter>
              </CardBody>
            </GlassCard>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Photo Details' : 'Add Photo to Gallery'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Image URL / Upload</Label>
                <Input type="text" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." required />
                <Input type="file" onChange={handleFileUpload} />
              </FormGroup>
              <FormGroup>
                <Label>Image Title</Label>
                <Input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <TextArea value={description} onChange={e => setDescription(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Upload Date</Label>
                <Input type="date" value={uploadDate} onChange={e => setUploadDate(e.target.value)} />
              </FormGroup>
              <SaveButton type="submit">Save Image</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Gallery;
