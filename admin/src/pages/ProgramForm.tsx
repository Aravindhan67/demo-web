import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { api } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryText};
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
`;

const FormCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  max-width: 800px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
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
  min-height: 100px;
  resize: vertical;
`;

const SaveButton = styled.button`
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const ProgramForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [kind, setKind] = useState('upcoming');
  const [launch, setLaunch] = useState('');
  const [description, setDescription] = useState('');
  const [path, setPath] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    if (id && location.state?.program) {
      const prog = location.state.program;
      setTitle(prog.title || '');
      setSlug(prog.slug || '');
      setKind(prog.kind || 'upcoming');
      setLaunch(prog.launch || '');
      setDescription(prog.description || '');
      setPath(prog.path || '');
      setImageKey(prog.imageKey || '');
      setStatus(prog.status || 'published');
    }
  }, [id, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, slug, kind, launch, description, path, imageKey, status };

    try {
      if (id) {
        await api.update('programs', id, payload);
      } else {
        await api.create('programs', payload);
      }
      navigate('/programs');
    } catch (err) {
      alert('Save failed');
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!id) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <BackButton to="/programs">
          <FaArrowLeft />
        </BackButton>
        <Title>{id ? 'Edit Program Details' : 'Add New Program'}</Title>
      </Header>

      <FormCard>
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
      </FormCard>
    </Container>
  );
};

export default ProgramForm;
