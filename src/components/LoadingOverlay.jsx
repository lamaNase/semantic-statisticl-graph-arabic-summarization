// components/LoadingOverlay.js
import './LoadingOverlay.css';

export default function LoadingOverlay({ progress }) {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
}

/*
<div className="loading-bar-wrapper">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
*/