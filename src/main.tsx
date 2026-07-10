import React from 'react';
import { createRoot } from 'react-dom/client';
import { PracticePage } from './features/practice/PracticePage';
import './styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PracticePage />
  </React.StrictMode>,
);
