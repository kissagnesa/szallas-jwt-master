import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const params=useParams;
    const id=params.id;

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const token = localStorage.getItem('jwt');
                if(!token) {
                    throw new Error('Nem található JWT token!');
                }
                const valasz = await axios.get('https://szallasjwt.sulla.hu/data' , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(valasz.data);
            }
            catch(error) {
                setError('Az adatok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve?');
                console.error("Hiba az adatok lekérése során: ", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
        <h2>Egy szállás adatai</h2>
        {error && <p style={{ color: 'red'}}> {error} </p>}
        {data.length>0 ? (
          <ul> 
         
          <li key={data.id}>{data.name} - {data.hostname} - {data.location} - {data.price} - {data.minimum_nights}
         <Link to={"/data/"}><i className="bi bi-backspace fs-6 btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
         <Link to={"/data-mod/" + data.id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
         <Link to={"/data-del/" + data.id}><i className="bi bi-trash3 fs-6 btn btn-danger"></i></Link><br /><br />
          </li>
        
        </ul> ) : ( <p>Nem találhatók az adatok!</p>)
    } 
    </div>
    );
}