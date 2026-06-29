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

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (id && location.state?.project) {
      const proj = location.state.project;
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
    }
  }, [id, location]);

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
      if (id) {
        await api.update('projects', id, payload);
      } else {
        await api.create('projects', payload);
      }
      navigate('/projects');
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <BackButton to="/projects">
          <FaArrowLeft />
        </BackButton>
        <Title>{id ? 'Edit Project Details' : 'Add New Project'}</Title>
      </Header>

      <FormCard>
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
          
          <SaveButton type="submit">Save Project</SaveButton>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ProjectForm;
