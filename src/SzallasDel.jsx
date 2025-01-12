import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const SzallasDel = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [szallas, setSzallas] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSzallas = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('Nem található JWT token!');
                }
                const res = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSzallas(res.data);
            } catch (err) {
                setError('Hiba történt az adat betöltése során.');
                console.error(err);
            }
        };
        fetchSzallas();
    }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('Nem található JWT token!');
            }
            await axios.delete(`https://szallasjwt.sulla.hu/data/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/SzallasList");
        } catch (err) {
            setError('Hiba történt a törlés során.');
            console.error(err);
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            <h2>Szállás törlése</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="card col-sm3 m-1 p-2">
                <p><b>Szállás neve:</b> {szallas.name}</p>
                <p><b>Szállásadó:</b> {szallas.hostname}</p>
                <p><b>Helyszín:</b> {szallas.location}</p>
                <p><b>Ár:</b> {szallas.price} Ft</p>
                <p><b>Minimum foglalható éjszakák:</b> {szallas.minimum_nights}</p>
                <form onSubmit={handleDelete}>
                    <Link to="/SzallasList" className="btn btn-warning">Vissza</Link>&nbsp;&nbsp;&nbsp;
                    <button type="submit" className="btn btn-danger">Törlés</button>
                </form>
            </div>
        </div>
    );
};