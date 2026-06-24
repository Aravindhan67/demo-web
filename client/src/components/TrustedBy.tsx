import CompanyLogo from './CompanyLogos';

export default function TrustedBy() {
  const companies = [
    'What Clicks',
    'VS Dental',
    'Credia Mediations',
    'Thoospot',
    'Tetra Platfms',
    'PRN Construction',
    'P Inc.',
    'Pharach',
    'Car Decore',
    'Pandiyan Agency'
  ];

  return (
    <>
      {/* TRUSTED BY */}
      <section className="section" style={{ background: "#fff", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: "700", textAlign: "center", marginBottom: "32px", color: "#1a1a1a" }}>Trusted by Great Companies</h2>
          <div className="trusted-by-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px", alignItems: "center" }}>
            {companies.map((name) => (
              <div 
                key={name} 
                style={{
                  height: '54px',
                  background: '#f8fafc',
                  border: '1.5px solid #f1f5f9',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease'
                }}
              >
                <CompanyLogo name={name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
