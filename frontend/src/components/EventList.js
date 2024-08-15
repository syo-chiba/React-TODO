import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventList({ events, onDelete }) {
  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        console.log('Event deleted:', response.data);
        onDelete(id); // 親コンポーネントに削除を通知
      })
      .catch(error => {
        console.error('There was an error deleting the event!', error);
      });
  };

  return (
    <ul className="event-list">
      {events.map(event => (
        <li key={event.id} className="event-item">
          <h2>{event.name}</h2>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Description: {event.description}</p>
          <Link to={`/edit/${event.id}`} className="edit">Edit</Link>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
