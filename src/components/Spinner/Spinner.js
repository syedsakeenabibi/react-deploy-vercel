import React from 'react';

const Spinner = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <svg
          style={styles.spinner}
          viewBox="0 0 50 50"
        >
          <circle
            style={styles.circle}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
        <style>
          {`
            @keyframes rotate {
              100% { transform: rotate(360deg); }
            }

            @keyframes dash {
              0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
              100% { stroke-dasharray: 90, 150; stroke-dashoffset: -125; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it appears above other content
  },
  container: {
    display: 'flex',
    justifyContent: 'center', // Center spinner
    alignItems: 'center',
  },
  spinner: {
    width: '40px', // Size of the spinner
    height: '40px',
    animation: 'rotate 1s linear infinite', // Rotation animation for the SVG
  },
  circle: {
    stroke: '#09f', // Spinner color
    strokeLinecap: 'round',
    animation: 'dash 1.5s ease-in-out infinite', // Dash animation for the circle
  },
};

export default Spinner;
