import React, { useState } from 'react';
import './DoodlePro.css';

type ServiceMood = {
  title1: string;
  title2: string;
  desc: string;
  label: string;
  volume: string;
  underlineWidth: string;
};

const SERVICES: ServiceMood[] = [
  {
    title1: 'GRAPHIC',
    title2: 'DESIGN.',
    desc: 'Brand identity and visual systems',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 01 / GRAPHICS',
    underlineWidth: '170px'
  },
  {
    title1: 'APP',
    title2: 'DEV.',
    desc: 'Mobile and web applications',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 02 / APPS',
    underlineWidth: '95px'
  },
  {
    title1: 'WEB',
    title2: 'DEV.',
    desc: 'Fast, modern, conversion-ready websites',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 03 / WEBSITES',
    underlineWidth: '95px'
  },
  {
    title1: 'SEO',
    title2: 'MKTG.',
    desc: 'Search visibility and organic growth',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 04 / GROWTH',
    underlineWidth: '115px'
  },
  {
    title1: 'UI / UX',
    title2: 'DESIGN.',
    desc: 'User-centered digital experiences',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 05 / DESIGN',
    underlineWidth: '170px'
  },
  {
    title1: 'DIGITAL',
    title2: 'MKTG.',
    desc: 'Campaigns that connect and convert',
    label: 'JAC MEDIALAND',
    volume: 'VOL. 06 / DIGITAL',
    underlineWidth: '115px'
  }
];

export function DoodlePro() {
  const [moodIndex, setMoodIndex] = useState(0);

  const cycleMood = (e: React.MouseEvent) => {
    e.preventDefault();
    setMoodIndex((prev) => (prev + 1) % SERVICES.length);
  };

  const currentService = SERVICES[moodIndex];
  const isOdd = moodIndex % 2 !== 0;

  return (
    <div className={`doodlepro doodlepro-theme-${moodIndex} ${isOdd ? 'doodlepro-theme-odd' : 'doodlepro-theme-even'}`}>
      <div className="doodlepro__stage">
        <button className="doodlepro__toggle" onClick={cycleMood} type="button" aria-label="Switch service mood">
          <span className="doodlepro__toggle-text">SWITCH MOOD</span>
          <span className="doodlepro__toggle-icon"></span>
        </button>

        <div className="doodlepro__poster">
          <div className="doodlepro__grain"></div>
          <div className="doodlepro__grid"></div>

          <span className="doodlepro__tape doodlepro__tape--left"></span>
          <span className="doodlepro__tape doodlepro__tape--right"></span>

          <span className="doodlepro__dot doodlepro__dot--one"></span>
          <span className="doodlepro__dot doodlepro__dot--two"></span>
          <span className="doodlepro__dot doodlepro__dot--three"></span>

          <span className="doodlepro__star doodlepro__star--one"></span>
          <span className="doodlepro__star doodlepro__star--two"></span>

          <span className="doodlepro__scribble doodlepro__scribble--one"></span>
          <span className="doodlepro__scribble doodlepro__scribble--two"></span>

          <span className="doodlepro__arrow"></span>

          <div className="doodlepro__label">{currentService.label}</div>

          <div 
            className="doodlepro__title" 
            style={{ '--title-underline-width': currentService.underlineWidth } as React.CSSProperties}
          >
            <span>{currentService.title1}</span>
            <span>{currentService.title2}</span>
          </div>

          <div className="doodlepro__underline"></div>

          <div className="doodlepro__ribbon">
            <div className="doodlepro__ribbon-track">
              <span>SOCIAL MEDIA MANAGEMENT // SOCIAL MEDIA MANAGEMENT // </span>
              <span>SOCIAL MEDIA MANAGEMENT // SOCIAL MEDIA MANAGEMENT // </span>
            </div>
          </div>

          <div className="doodlepro__footer">
            <div className="doodlepro__barcode"></div>

            <div className="doodlepro__caption">
              <strong>{currentService.volume}</strong>
              <p>{currentService.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
