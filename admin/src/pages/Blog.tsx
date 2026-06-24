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

const TableCard = styled.div`
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

const FeaturedImg = styled.img`
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
`;

const Badge = styled.span<{ $status: string }>`
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $status }) => 
    $status === 'Published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)'};
  color: ${({ $status, theme }) => 
    $status === 'Published' ? theme.success : theme.textLight};
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
  min-height: 120px;
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

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [status, setStatus] = useState('Draft');

  const fetchBlogs = async () => {
    try {
      const data = await api.list('blogs');
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setFeaturedImage('');
    setCategory('');
    setAuthor(localStorage.getItem('admin_name') || 'Admin');
    setDescription('');
    setPublishDate(new Date().toISOString().substring(0, 10));
    setStatus('Draft');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: any) => {
    setEditingId(b._id);
    setTitle(b.title);
    setFeaturedImage(b.featuredImage || '');
    setCategory(b.category);
    setAuthor(b.author);
    setDescription(b.description);
    setPublishDate(b.publishDate ? b.publishDate.substring(0, 10) : '');
    setStatus(b.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.delete('blogs', id);
      fetchBlogs();
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
      setFeaturedImage(res.url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, featuredImage, category, author, description, publishDate, status };

    try {
      if (editingId) {
        await api.update('blogs', editingId, payload);
      } else {
        await api.create('blogs', payload);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Blog Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Blog
        </AddButton>
      </Header>

      <TableCard>
        {loading ? (
          <div>Loading blogs...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Author</Th>
                <Th>Publish Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id}>
                  <Td>
                    {b.featuredImage ? (
                      <FeaturedImg src={b.featuredImage.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${b.featuredImage}` : b.featuredImage} alt={b.title} />
                    ) : (
                      <div style={{ width: 60, height: 40, background: '#3b82f615', borderRadius: 6 }} />
                    )}
                  </Td>
                  <Td style={{ fontWeight: 600 }}>{b.title}</Td>
                  <Td>{b.category}</Td>
                  <Td>{b.author}</Td>
                  <Td>{new Date(b.publishDate).toLocaleDateString()}</Td>
                  <Td>
                    <Badge $status={b.status}>{b.status}</Badge>
                  </Td>
                  <Td>
                    <ActionGroup>
                      <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(b)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton $color="#ef4444" onClick={() => handleDelete(b._id)}>
                        <FaTrash />
                      </IconButton>
                    </ActionGroup>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableCard>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Blog Post' : 'Create Blog Post'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Blog Title</Label>
                <Input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Featured Image URL / Upload</Label>
                <Input type="text" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="https://..." />
                <Input type="file" onChange={handleFileUpload} />
              </FormGroup>
              <FormGroup>
                <Label>Category</Label>
                <Input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Author</Label>
                <Input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Description (Content)</Label>
                <TextArea value={description} onChange={e => setDescription(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Publish Date</Label>
                <Input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </Select>
              </FormGroup>
              <SaveButton type="submit">Save Post</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Blog;
