import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditEventPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(response => {
        const event = response.data;
        setName(event.name);
        setDate(event.date.split('T')[0]); // 日付をフォーマット
        setLocation(event.location);
        setDescription(event.description);
      })
      .catch(error => {
        console.error('There was an error fetching the event!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/events/${id}`, { name, date, location, description })
      .then(response => {
        console.log('Event updated:', response.data);
        navigate('/'); // 更新後にホームページにリダイレクト
      })
      .catch(error => {
        console.error('There was an error updating the event!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
}

export default EditEventPage;
