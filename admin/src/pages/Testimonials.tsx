import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
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

const ClientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ClientPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ClientName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
`;

const CompanyName = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
`;

const FeedbackText = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  font-style: italic;
  flex-grow: 1;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #fbbf24;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  padding-top: 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textLight};
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

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const Testimonials: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [clientPhoto, setClientPhoto] = useState('');
  const [date, setDate] = useState('');

  const fetchTestimonials = async () => {
    try {
      const data = await api.list('testimonials');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setClientName('');
    setCompanyName('');
    setFeedback('');
    setRating(5);
    setClientPhoto('');
    setDate(new Date().toISOString().substring(0, 10));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: any) => {
    setEditingId(t._id);
    setClientName(t.clientName);
    setCompanyName(t.companyName || '');
    setFeedback(t.feedback);
    setRating(t.rating);
    setClientPhoto(t.clientPhoto || '');
    setDate(t.date ? t.date.substring(0, 10) : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete('testimonials', id);
      fetchTestimonials();
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
      setClientPhoto(res.url);
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { clientName, companyName, feedback, rating, clientPhoto, date };

    try {
      if (editingId) {
        await api.update('testimonials', editingId, payload);
      } else {
        await api.create('testimonials', payload);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Testimonials Management</Title>
        <AddButton onClick={handleOpenAdd}>
          <FaPlus />
          Add Testimonial
        </AddButton>
      </Header>

      {loading ? (
        <div>Loading testimonials...</div>
      ) : (
        <Grid>
          {items.map((t) => (
            <GlassCard key={t._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => handleOpenEdit(t)}>
                  <FaEdit />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(t._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              <ClientHeader>
                <ClientPhoto src={t.clientPhoto?.startsWith('/uploads') ? `${import.meta.env.VITE_CMS_API_URL || 'http://localhost:4000'}${t.clientPhoto}` : t.clientPhoto || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80'} alt={t.clientName} />
                <ClientInfo>
                  <ClientName>{t.clientName}</ClientName>
                  <CompanyName>{t.companyName || 'N/A'}</CompanyName>
                </ClientInfo>
              </ClientHeader>
              <Stars>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </Stars>
              <FeedbackText>"{t.feedback}"</FeedbackText>
              <CardFooter>
                <span>{new Date(t.date).toLocaleDateString()}</span>
              </CardFooter>
            </GlassCard>
          ))}
        </Grid>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {editingId ? 'Edit Testimonial Details' : 'Add Testimonial'}
              </h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>&times;</button>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Client Name</Label>
                <Input type="text" value={clientName} onChange={e => setClientName(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Company Name</Label>
                <Input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Feedback / Testimonial Content</Label>
                <TextArea value={feedback} onChange={e => setFeedback(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label>Rating (1-5)</Label>
                <Select value={rating} onChange={e => setRating(Number(e.target.value))}>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Client Photo URL / Upload</Label>
                <Input type="text" value={clientPhoto} onChange={e => setClientPhoto(e.target.value)} placeholder="https://..." />
                <Input type="file" onChange={handleFileUpload} />
              </FormGroup>
              <FormGroup>
                <Label>Testimonial Date</Label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </FormGroup>
              <SaveButton type="submit">Save Testimonial</SaveButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Testimonials;
