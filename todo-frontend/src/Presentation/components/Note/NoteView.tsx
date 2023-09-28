import React from 'react';
import './NoteView.css'
import { format } from 'date-fns';


interface NoteProps {
  title: string;
  description: string;
  time: string;
}

const Note: React.FC<NoteProps> = ({ title, description, time }) => {
  return (
    <div className="note-card">
    <div className="note-header">
      <div className="note-corner"> {title}</div>
      <div className="note-time">{format(new Date(time), 'yyyy-MM-dd')}</div>
    </div>
    <div className="note-content">
      <p>{description}</p>
    </div>
  </div>
  );
};

export default Note;
