import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function MusicianDetail() {
  const [musician, setMusician] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMusician = async () => {
      const response = await axios.get(`http://localhost:8000/api/v1/musicians/${id}/`);
      setMusician(response.data);
    };

    fetchMusician();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/musicians/${id}/`);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>{musician.name}</h2>
      <p>Description: {musician.description}</p>
      <p>Age: {musician.age}</p>
      <p>Instrument: {musician.instrument_details?.name}</p>
      <p>Styles: {musician.styles_details?.map(style => style.name).join(', ')}</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete Musician</button>
    </div>
  );
}

export default MusicianDetail;
