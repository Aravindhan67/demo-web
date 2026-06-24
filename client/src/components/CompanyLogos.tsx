import React from 'react';

interface LogoProps {
  name: string;
  isMarquee?: boolean;
}

const logoMapping: Record<string, string> = {
  'What Clicks': '/logos/1.webp',
  'VS Dental': '/logos/2.webp',
  'Credia Mediations': '/logos/3.webp',
  'Thoospot': '/logos/4.webp',
  'Tetra Platfms': '/logos/5.webp',
  'PRN Construction': '/logos/6.webp',
  'P Inc.': '/logos/7.webp',
  'Pharach': '/logos/8.webp',
  'Car Decore': '/logos/9.webp',
  'Pandiyan Agency': '/logos/10.webp'
};

function resolveUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const finalBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${finalBaseUrl}${cleanPath}`;
}

export default function CompanyLogo({ name }: LogoProps) {
  const logoSrc = logoMapping[name] || logoMapping['What Clicks'];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }}>
      <img src={resolveUrl(logoSrc)} alt={name} />
    </div>
  );
}
