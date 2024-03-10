import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function MusicianEdit() {
    const [musician, setMusician] = useState(null);
    const [instruments, setInstruments] = useState([]); // Moved inside the component
    const [styles, setStyles] = useState([]); // Moved inside the component
    const { register, handleSubmit, setValue } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstrumentsAndStyles = async () => {
            const instrumentsResponse = await axios.get('http://localhost:8000/api/v1/instruments/');
            const stylesResponse = await axios.get('http://localhost:8000/api/v1/styles/');
            setInstruments(instrumentsResponse.data);
            setStyles(stylesResponse.data);
        };

        const fetchMusician = async () => { // Define fetchMusician function
            const response = await axios.get(`http://localhost:8000/api/v1/musicians/${id}/`);
            setMusician(response.data);
            // Example of setting form values
            setValue('name', response.data.name);
            setValue('description', response.data.description);
            setValue('age', response.data.age);
            setValue('instrument', response.data.instrument.id);
            const styleIds = response.data.styles_details.map(style => style.id);
            setValue('styles', styleIds);
        };

        fetchInstrumentsAndStyles();
        fetchMusician(); // Correctly call the function here
    }, [id, setValue]);

    const onSubmit = async (data) => {
        // Transform styles to integer array if it's not already
        if(data.styles && typeof data.styles === 'string') {
            data.styles = data.styles.split(',').map(styleId => parseInt(styleId, 10));
        }
        data.instrument = parseInt(data.instrument, 10);

        await axios.put(`http://localhost:8000/api/v1/musicians/${id}/`, data);
        navigate('/');
    };

    return musician ? (
        <div className="container mt-5">
            <h2>Edit Musician</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder="Name" required />
                <textarea {...register('description')} placeholder="Description" required />
                <input type="number" {...register('age')} placeholder="Age" required />
                <select {...register('instrument')} required>
                    {instruments.map(instrument => (
                        <option key={instrument.id} value={instrument.id}>{instrument.name}</option>
                    ))}
                </select>
                <select {...register('styles')} multiple required>
                    {styles.map(style => (
                        <option key={style.id} value={style.id}>{style.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-success">Save Changes</button>
            </form>
        </div>
    ) : (
        <div>Loading...</div>
    );
}

export default MusicianEdit;
