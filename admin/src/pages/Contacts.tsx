import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaDownload, FaEye } from 'react-icons/fa';
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

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.success};
  color: ${({ theme }) => theme.primaryText};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
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
  gap: 0.75rem;
  position: relative;
`;

const ContactName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 1.5rem;
`;

const ContactEmail = styled.a`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const MetaInfo = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SubjectText = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textLight};
  font-weight: 600;
  text-transform: uppercase;
`;

const DetailValue = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

const MessageValue = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  white-space: pre-wrap;
  background: ${({ theme }) => theme.sidebarActiveBg};
  padding: 1rem;
  border-radius: 8px;
`;

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  const fetchContacts = async () => {
    try {
      const data = await api.list('contacts');
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this contact enquiry permanently?')) return;
    try {
      await api.delete('contacts', id);
      fetchContacts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleExportCSV = async () => {
    try {
      await api.exportContacts();
    } catch (err) {
      alert('Export failed');
    }
  };

  return (
    <Container className="animated-fade">
      <Header>
        <Title>Contact Enquiries</Title>
        <ExportButton onClick={handleExportCSV}>
          <FaDownload />
          Export CSV
        </ExportButton>
      </Header>

      {loading ? (
        <div>Loading contact enquiries...</div>
      ) : (
        <Grid>
          {contacts.map((c) => (
            <GlassCard key={c._id}>
              <CardActions>
                <IconButton $color="#3b82f6" onClick={() => setSelectedEnquiry(c)}>
                  <FaEye />
                </IconButton>
                <IconButton $color="#ef4444" onClick={() => handleDelete(c._id)}>
                  <FaTrash />
                </IconButton>
              </CardActions>
              <ContactName>{c.name}</ContactName>
              <ContactEmail href={`mailto:${c.email}`}>{c.email}</ContactEmail>
              <MetaInfo>
                <span>Phone: {c.mobileNumber || 'N/A'}</span>
                <span>Date: {new Date(c.createdAt).toLocaleDateString()}</span>
              </MetaInfo>
              <SubjectText>{c.subject || 'No Subject'}</SubjectText>
            </GlassCard>
          ))}
        </Grid>
      )}

      {selectedEnquiry && (
        <ModalOverlay onClick={() => setSelectedEnquiry(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Enquiry Details</h3>
              <button style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setSelectedEnquiry(null)}>&times;</button>
            </ModalHeader>
            <div>
              <DetailRow>
                <DetailLabel>Name</DetailLabel>
                <DetailValue>{selectedEnquiry.name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{selectedEnquiry.email}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Mobile Number</DetailLabel>
                <DetailValue>{selectedEnquiry.mobileNumber || 'N/A'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Subject</DetailLabel>
                <DetailValue>{selectedEnquiry.subject || 'No Subject'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Submitted Date</DetailLabel>
                <DetailValue>{new Date(selectedEnquiry.createdAt).toLocaleString()}</DetailValue>
              </DetailRow>
              <DetailRow style={{ border: 'none', marginBottom: 0 }}>
                <DetailLabel>Message</DetailLabel>
                <MessageValue>{selectedEnquiry.message}</MessageValue>
              </DetailRow>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Contacts;
