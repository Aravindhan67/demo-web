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

const Badge = styled.span<{ $kind?: string }>`
  padding: 0.25rem 0.6rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $kind }) => $kind === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
  color: ${({ $kind }) => $kind === 'active' ? '#22c55e' : '#f59e0b'};
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
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  max-height: 90vh;
  overflow-y: auto;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [kind, setKind] = useState('upcoming');
  const [launch, setLaunch] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [status, setStatus] = useState('published');

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
    setEditingId(null);
    setTitle('');
    setSlug('');
    setKind('upcoming');
    setLaunch('');
    setDescription('');
    setPath('');
    setImageKey('');
    setStatus('published');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prog: any) => {
    setEditingId(prog._id);
    setTitle(prog.title || '');
    setSlug(prog.slug || '');
    setKind(prog.kind || 'upcoming');
    setLaunch(prog.launch || '');
    setDescription(prog.description || '');
    setPath(prog.path || '');
    setImageKey(prog.imageKey || '');
    setStatus(prog.status || 'published');
    setIsModalOpen(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, slug, kind, launch, description, path, imageKey, status };

    try {
      if (editingId) {
        await api.update('programs', editingId, payload);
      } else {
        await api.create('programs', payload);
      }
      setIsModalOpen(false);
      fetchPrograms();
    } catch (err) {
      alert('Save failed');
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
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

      <TableCard>
        {loading ? (
          <div>Loading programs...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Kind</Th>
                <Th>Launch Info</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {programs.map((prog) => (
                <tr key={prog._id}>
                  <Td style={{ fontWeight: 600 }}>{prog.title}</Td>
                  <Td>
                    <Badge $kind={prog.kind}>
                      {prog.kind === 'active' ? 'Active' : 'Upcoming'}
                    </Badge>
                  </Td>
                  <Td>{prog.launch}</Td>
                  <Td>{prog.status}</Td>
                  <Td>
                    <ActionGroup>
                      <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(prog)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton $color="#ef4444" onClick={() => handleDelete(prog._id)}>
                        <FaTrash />
                      </IconButton>
                    </ActionGroup>
                  </Td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <Td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>
                    No programs found. Add your first program to get started.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </TableCard>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Program Details' : 'Add New Program'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'inherit' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Program Title</Label>
                <Input type="text" value={title} onChange={e => handleTitleChange(e.target.value)} required />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label>Slug</Label>
                  <Input type="text" value={slug} onChange={e => setSlug(e.target.value)} required />
                </FormGroup>
                <FormGroup>
                  <Label>Status</Label>
                  <Select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Kind</Label>
                  <Select value={kind} onChange={e => setKind(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Launch Info (e.g., 'Open Now' or 'Q4 2026')</Label>
                  <Input type="text" value={launch} onChange={e => setLaunch(e.target.value)} required />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Description</Label>
                <TextArea value={description} onChange={e => setDescription(e.target.value)} required />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>URL Path (Optional)</Label>
                  <Input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="/programs/internship" />
                </FormGroup>
                <FormGroup>
                  <Label>Image Key (Optional)</Label>
                  <Input type="text" value={imageKey} onChange={e => setImageKey(e.target.value)} placeholder="internship, design, full-stack" />
                </FormGroup>
              </FormRow>

              <SaveButton type="submit">Save Program</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Programs;
