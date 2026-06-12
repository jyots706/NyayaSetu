import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>Welcome to NyayaSetu</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Bridging the gap between citizens and the legal system with AI-powered Voice and Document Analysis.
      </p>
      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Get Started</h2>
        <p>Login or create an account to start submitting cases.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/login"><button className="btn-primary">Login</button></Link>
          <Link to="/register"><button className="btn-primary" style={{ backgroundColor: 'var(--secondary)' }}>Register</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
