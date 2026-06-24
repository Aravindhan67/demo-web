import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../services/api';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.body} 0%, rgba(59, 130, 246, 0.1) 100%);
`;

const GlassCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: ${({ theme }) => theme.glassBlur};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  animation: fadeIn 0.4s ease forwards;
`;

const Brand = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  border-radius: 10px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
  }
`;

const Alert = styled.div<{ $type: 'success' | 'error' }>`
  background: ${({ $type }) => ($type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 110, 110, 0.15)')};
  border: 1px solid ${({ $type, theme }) => ($type === 'success' ? theme.success : theme.danger)};
  color: ${({ $type, theme }) => ($type === 'success' ? theme.success : theme.danger)};
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const ToggleLink = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.85rem;
  cursor: pointer;
  text-align: right;
  margin-top: -0.5rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const BackLink = styled.span`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-block;
  margin-top: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.text};
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [view, setView] = useState<'login' | 'forgot' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    try {
      const data = await api.login({ email, password });
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_name', data.name);
      navigate('/dashboard');
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Invalid email or password' });
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    try {
      const data = await api.forgotPassword(email);
      setAlert({ 
        type: 'success', 
        message: `${data.message} Token: ${data.token}`
      });
      setToken(data.token);
      setView('reset');
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Error occurred.' });
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    try {
      await api.resetPassword({ token, newPassword });
      setAlert({ type: 'success', message: 'Password reset successful! You can login now.' });
      setTimeout(() => {
        setView('login');
        setAlert(null);
      }, 2000);
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Error occurred.' });
    }
  };

  return (
    <Container>
      <GlassCard>
        <Brand>JAC MediaLand</Brand>
        
        {view === 'login' && (
          <>
            <Subtitle>Admin Panel Portal</Subtitle>
            {alert && <Alert $type={alert.type}>{alert.message}</Alert>}
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label>Email Address</Label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="admin@jacmedialand.com" 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                />
              </FormGroup>
              <ToggleLink onClick={() => setView('forgot')}>Forgot password?</ToggleLink>
              <Button type="submit">Sign In</Button>
            </Form>
          </>
        )}

        {view === 'forgot' && (
          <>
            <Subtitle>Reset Your Password</Subtitle>
            {alert && <Alert $type={alert.type}>{alert.message}</Alert>}
            <Form onSubmit={handleForgot}>
              <FormGroup>
                <Label>Enter Your Email Address</Label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="admin@jacmedialand.com" 
                  required 
                />
              </FormGroup>
              <Button type="submit">Send Reset Token</Button>
            </Form>
            <BackLink onClick={() => { setView('login'); setAlert(null); }}>Back to Login</BackLink>
          </>
        )}

        {view === 'reset' && (
          <>
            <Subtitle>Set New Password</Subtitle>
            {alert && <Alert $type={alert.type}>{alert.message}</Alert>}
            <Form onSubmit={handleReset}>
              <FormGroup>
                <Label>Password Reset Token</Label>
                <Input 
                  type="text" 
                  value={token} 
                  onChange={(e) => setToken(e.target.value)} 
                  placeholder="Pasted token" 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                />
              </FormGroup>
              <Button type="submit">Update Password</Button>
            </Form>
            <BackLink onClick={() => { setView('login'); setAlert(null); }}>Back to Login</BackLink>
          </>
        )}
      </GlassCard>
    </Container>
  );
};

export default Login;
