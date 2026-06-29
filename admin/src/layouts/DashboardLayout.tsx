import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaTachometerAlt, FaFolderOpen, FaImages, FaConciergeBell, 
  FaUsers, FaBlog, FaQuoteRight, FaEnvelope, FaSlidersH, 
  FaSignOutAlt, FaSun, FaMoon, FaBars, FaTimes, FaGraduationCap 
} from 'react-icons/fa';

interface SidebarProps {
  $isOpen: boolean;
}

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 992px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
    backdrop-filter: blur(2px);
  }
`;

const Sidebar = styled.aside<SidebarProps>`
  width: 280px;
  background: ${({ theme }) => theme.sidebarBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border-right: 1px solid ${({ theme }) => theme.cardBorder};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;

  @media (max-width: 992px) {
    position: fixed;
    height: 100vh;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-280px')};
    top: 0;
    box-shadow: ${({ $isOpen }) => ($isOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none')};
  }
`;

const SidebarBrand = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ $active, theme }) => ($active ? theme.sidebarActiveText : theme.textLight)};
  background: ${({ $active, theme }) => ($active ? theme.sidebarActiveBg : 'transparent')};
  transition: all 0.2s ease;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.cardBorder : 'transparent')};

  &:hover {
    color: ${({ theme }) => theme.text};
    background: ${({ $active, theme }) => ($active ? theme.sidebarActiveBg : 'rgba(255,255,255,0.05)')};
    transform: translateX(4px);
  }
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Topbar = styled.header`
  height: 70px;
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  cursor: pointer;

  @media (max-width: 992px) {
    display: block;
  }
`;

const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;

  @media (max-width: 576px) {
    gap: 0.75rem;
  }
`;

const ThemeToggler = styled.button`
  background: ${({ theme }) => theme.sidebarActiveBg};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  color: ${({ theme }) => theme.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
`;

const UserInfo = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

const UserName = styled.p`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserRole = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textLight};
`;

const PageBody = styled.div`
  padding: 2rem;
  flex-grow: 1;
  background: ${({ theme }) => theme.body};
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.danger};
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: translateX(4px);
  }
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, darkMode, toggleDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem('admin_name') || 'Admin';

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Projects', path: '/projects', icon: <FaFolderOpen /> },
    { label: 'Gallery', path: '/gallery', icon: <FaImages /> },
    { label: 'Services', path: '/services', icon: <FaConciergeBell /> },
    { label: 'Team Members', path: '/team', icon: <FaUsers /> },
    { label: 'Programs', path: '/programs', icon: <FaGraduationCap /> },
    { label: 'Blog Posts', path: '/blog', icon: <FaBlog /> },
    { label: 'Testimonials', path: '/testimonials', icon: <FaQuoteRight /> },
    { label: 'Contact Enquiries', path: '/contacts', icon: <FaEnvelope /> },
    { label: 'Settings', path: '/settings', icon: <FaSlidersH /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    navigate('/login');
  };

  return (
    <LayoutWrapper>
      <Overlay $isOpen={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Sidebar $isOpen={sidebarOpen}>
        <div>
          <SidebarBrand>
            <span>JAC MediaLand</span>
          </SidebarBrand>
          <NavList>
            {menuItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                $active={location.pathname === item.path}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.label}
              </NavItem>
            ))}
          </NavList>
        </div>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <Topbar>
          <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </MenuButton>
          <TopbarRight>
            <ThemeToggler onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggler>
            <UserProfile>
              <UserAvatar>{name.charAt(0).toUpperCase()}</UserAvatar>
              <UserInfo>
                <UserName>{name}</UserName>
                <UserRole>Administrator</UserRole>
              </UserInfo>
            </UserProfile>
          </TopbarRight>
        </Topbar>
        <PageBody>{children}</PageBody>
      </MainContent>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
