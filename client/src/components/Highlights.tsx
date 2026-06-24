
export default function Highlights() {
  return (
    <>
{/* OUR HIGHLIGHTS */}
  <section style={{"padding":"60px 80px","background":"#f7f7f9","borderTop":"1px solid #eee","borderBottom":"1px solid #eee"}}>
    <div style={{"maxWidth":"1100px","margin":"0 auto"}}>
      <h2 style={{"fontFamily":"'Syne',sans-serif","fontSize":"28px","fontWeight":"700","textAlign":"center","marginBottom":"40px","color":"#1a1a1a"}}>Our Highlights</h2>
      <div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"0","textAlign":"center"}}>
        <div style={{"padding":"20px","borderRight":"1px solid #e0e0e0"}}>
          <div style={{"fontFamily":"'Syne',sans-serif","fontSize":"40px","fontWeight":"800","color":"#1a1a1a"}}>35,064+</div>
          <div style={{"fontSize":"13px","color":"#999","marginTop":"6px"}}>Hours of Support</div>
        </div>
        <div style={{"padding":"20px","borderRight":"1px solid #e0e0e0"}}>
          <div style={{"fontFamily":"'Syne',sans-serif","fontSize":"40px","fontWeight":"800","color":"#1a1a1a"}}>2,300+</div>
          <div style={{"fontSize":"13px","color":"#999","marginTop":"6px"}}>Projects</div>
        </div>
        <div style={{"padding":"20px","borderRight":"1px solid #e0e0e0"}}>
          <div style={{"fontFamily":"'Syne',sans-serif","fontSize":"40px","fontWeight":"800","color":"#1a1a1a"}}>3,000+</div>
          <div style={{"fontSize":"13px","color":"#999","marginTop":"6px"}}>Happy Clients</div>
        </div>
        <div style={{"padding":"20px"}}>
          <div style={{"fontFamily":"'Syne',sans-serif","fontSize":"40px","fontWeight":"800","color":"#1a1a1a"}}>30</div>
          <div style={{"fontSize":"13px","color":"#999","marginTop":"6px"}}>SmartMates</div>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
