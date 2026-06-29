import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  FaFolderOpen, FaImages, FaConciergeBell, FaUsers, 
  FaEnvelope, FaHistory 
} from 'react-icons/fa';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { api } from '../services/api';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: transform 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: ${({ $color }) => `${$color}15`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.span`
  font-size: 1.8rem;
  font-weight: 800;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  font-weight: 500;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const GlassPanel = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const PanelTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActivityList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ActivityItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.primary};
`;

const ActivityAction = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const ActivityDesc = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
`;

const ActivityTime = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textLight};
  margin-top: 0.25rem;
`;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard statistics...</div>;
  }

  const statCards = [
    { label: 'Total Projects', value: stats?.counts?.projects || 0, icon: <FaFolderOpen />, color: '#3b82f6' },
    { label: 'Gallery Images', value: stats?.counts?.gallery || 0, icon: <FaImages />, color: '#10b981' },
    { label: 'Team Members', value: stats?.counts?.team || 0, icon: <FaUsers />, color: '#8b5cf6' },
    { label: 'Total Services', value: stats?.counts?.services || 0, icon: <FaConciergeBell />, color: '#f59e0b' },
    { label: 'Contact Enquiries', value: stats?.counts?.contacts || 0, icon: <FaEnvelope />, color: '#3b82f6' }
  ];

  return (
    <div className="animated-fade">
      <Grid>
        {statCards.map((card, i) => (
          <StatCard key={i}>
            <IconWrapper $color={card.color}>{card.icon}</IconWrapper>
            <StatInfo>
              <StatNumber>{card.value}</StatNumber>
              <StatLabel>{card.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </Grid>

      <SectionGrid>
        <GlassPanel>
          <PanelTitle>Monthly Statistics Charts</PanelTitle>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={stats?.monthlyStats || []}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="views" name="Page Views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="contacts" name="Leads / Enquiries" stroke="#10b981" fillOpacity={1} fill="url(#colorContacts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel>
          <PanelTitle>
            <FaHistory />
            Recent Activities
          </PanelTitle>
          {stats?.recentActivities && stats.recentActivities.length > 0 ? (
            <ActivityList>
              {stats.recentActivities.map((act: any) => (
                <ActivityItem key={act._id}>
                  <ActivityAction>{act.action}</ActivityAction>
                  <ActivityDesc>{act.description}</ActivityDesc>
                  <ActivityTime>{new Date(act.createdAt).toLocaleString()}</ActivityTime>
                </ActivityItem>
              ))}
            </ActivityList>
          ) : (
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No recent activities.</div>
          )}
        </GlassPanel>
      </SectionGrid>
    </div>
  );
};

export default Dashboard;
