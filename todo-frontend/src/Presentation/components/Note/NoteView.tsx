import React from 'react';
import './NoteView.css'
interface NoteProps {
  description: string;
  time: string;
}

const Note: React.FC<NoteProps> = ({ description, time }) => {
  return (
    <div className="note-card">
    <div className="note-header">
      <div className="note-corner"> titulo</div>
      <div className="note-time">2h ago</div>
    </div>
    <div className="note-content">
      <p>Este es el contenido de la nota. Puedes agregar texto aquí.</p>
    </div>
  </div>
  );
};

export default Note;
