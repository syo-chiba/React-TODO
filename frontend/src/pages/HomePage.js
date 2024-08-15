import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';

function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <h1>Events</h1>
      <EventList events={events} onDelete={handleDelete} />
    </div>
  );
}

export default HomePage;
