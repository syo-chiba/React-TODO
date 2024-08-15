import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventForm({ eventId }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      axios.get(`http://localhost:5000/api/events/${eventId}`)
        .then(response => {
          const event = response.data;
          setName(event.name);
          setDate(event.date);
          setLocation(event.location);
          setDescription(event.description);
        })
        .catch(error => {
          console.error('There was an error fetching the event!', error);
        });
    }
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { name, date, location, description };

    if (eventId) {
      axios.put(`http://localhost:5000/api/events/${eventId}`, eventData)
        .then(response => {
          console.log('Event updated:', response.data);
          navigate('/'); // 成功時にホーム画面にリダイレクト
        })
        .catch(error => {
          console.error('There was an error updating the event!', error);
        });
    } else {
      axios.post('http://localhost:5000/api/events', eventData)
        .then(response => {
          console.log('Event created:', response.data);
          navigate('/'); // 成功時にホーム画面にリダイレクト
        })
        .catch(error => {
          console.error('There was an error creating the event!', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
}

export default EventForm;
