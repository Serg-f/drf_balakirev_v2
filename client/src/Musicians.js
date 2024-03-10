import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Musicians() {
    const [musicians, setMusicians] = useState([]);

    useEffect(() => {
        const fetchMusicians = async () => {
            const response = await axios.get('http://localhost:8000/api/v1/musicians/');
            setMusicians(response.data);
        };

        fetchMusicians();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Musicians List</h2>
            <div className="list-group">
                {musicians.map(musician => (
                    <Link to={`/musicians/${musician.id}`} className="list-group-item list-group-item-action"
                          aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{musician.name}</h5>
                            <small>{musician.age} years old</small>
                        </div>
                        <p className="mb-1">{musician.description}</p>
                        <small>{musician.instrument_details.name}.
                            Styles: {musician.styles_details.map(style => style.name).join(', ')}.</small>
                    </Link>
                ))}
            </div>
        </div>
    )
        ;
}

export default Musicians;
