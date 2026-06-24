import React from 'react';
import './ManifestoShowcase.css';

export function ManifestoShowcase() {
  return (
    <div className="manifesto-showcase">
      <input type="checkbox" id="rebel-toggle" className="rebel-toggle" />

      <div className="presentation-stage">
        <label htmlFor="rebel-toggle" className="aesthetic-switch">
          <span className="switch-track"></span>
          <span className="switch-text mode-clean">BRUTALIZE AESTHETIC-CLICK ME </span>
          <span className="switch-text mode-chaos">RESTORE MINIMALISM</span>
        </label>

        <div className="poster-card">
          <div className="css-mesh-grain"></div>
          <div className="drafting-grid"></div>

          <div className="geo-orb"></div>

          <div className="type-container">
            <div className="huge-text word-1">FRONT</div>
            <div className="huge-text word-2">END.</div>
          </div>

          <div className="tape-ribbon">
            <div className="tape-scroll">
              <span>NO JS // PURE CSS // BOLD AESTHETICS // REJECT MEDIOCRITY // </span>
              <span>NO JS // PURE CSS // BOLD AESTHETICS // REJECT MEDIOCRITY // </span>
            </div>
          </div>

          <div className="poster-footer">
            <div className="barcode"></div>
            <div className="manifesto-text">
              <p className="vol">VOL. 01 / REBELLION</p>
              <p className="desc">
                Crafted exclusively with structural markup and cascading
                stylesheets. Zero scripts. Zero compromises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
