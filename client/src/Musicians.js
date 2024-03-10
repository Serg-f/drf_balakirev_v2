import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

function Musicians() {
    const [musicians, setMusicians] = useState([]);
    const {register, handleSubmit, reset} = useForm();

    const [instruments, setInstruments] = useState([]);
    const [styles, setStyles] = useState([]);

    useEffect(() => {
        const fetchInstrumentsAndStyles = async () => {
            const instrumentsResponse = await axios.get('http://localhost:8000/api/v1/instruments/');
            const stylesResponse = await axios.get('http://localhost:8000/api/v1/styles/');
            setInstruments(instrumentsResponse.data);
            setStyles(stylesResponse.data);
        };

        fetchMusicians();
        fetchInstrumentsAndStyles();
    }, []);


    const fetchMusicians = async () => {
        const response = await axios.get('http://localhost:8000/api/v1/musicians/');
        setMusicians(response.data);
    };

    const onSubmit = async (data) => {
        // Convert styles from string to integer
        data.styles = data.styles.map(styleId => parseInt(styleId, 10));

        // Assuming `instrument` needs to be an integer
        data.instrument = parseInt(data.instrument, 10);

        // Assuming `age` needs to be an integer
        data.age = parseInt(data.age, 10);

        try {
            await axios.post('http://localhost:8000/api/v1/musicians/', data);
            await fetchMusicians();
            reset(); // Clear the form
        } catch (error) {
            console.error("There was an error creating the musician:", error.response);
            // Here, you can add more detailed error handling, e.g., displaying error messages to the user
        }
    };


    return (
        <div className="container mt-5">
            <h2>Add a New Musician</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder="Name" required/>
                <input {...register('description')} placeholder="Description" required/>
                <input type="number" {...register('age')} placeholder="Age" required/>
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
                <button type="submit" className="btn btn-primary">Add Musician</button>
            </form>
            <h2 className="mt-5">Musicians List</h2>
            <div className="list-group">
                {musicians.map(musician => (
                    <Link key={musician.id} to={`/musicians/${musician.id}`}
                          className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{musician.name}</h5>
                            <small>{musician.age} years old</small>
                        </div>
                        <p className="mb-1">{musician.description}</p>
                        <small>Instrument: {musician.instrument_details?.name}.
                            Styles: {musician.styles_details?.map(style => style.name).join(', ')}.</small>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Musicians;
