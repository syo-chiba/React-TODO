import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventItem({ event }) {
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/events/${event.id}`)
      .then(response => {
        console.log('Event deleted:', response.data);
      })
      .catch(error => {
        console.error('There was an error deleting the event!', error);
      });
  };

  return (
    <li>
      <h2>{event.name}</h2>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <Link to={`/edit/${event.id}`} className="edit">Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default EventItem;
