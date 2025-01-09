import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SzallasList } from './SzallasList';

export const SzallasMod = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [data, setData] = useState({
        
        "name": '',
        "hostname": '',
        "location": '',
        "price": 0,
        "minimum_nights":''
});

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const valasz = await axios.get("https://szallasjwt.sulla.hu/data/" + id);
                setData(valasz.data);
            }
            catch (error) {
                console.log("Hiba a lekérdezésben: ", error);
            }
        }   
        fetchData();
    }, [id]);

const handleInputChange = event => {
    const { name, value } = event.target;
    setData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSubmit = event =>{
    event.preventDefault();
    fetch(`https://szallasjwt.sulla.hu/data/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(SzallasList), // a Szallas objektumot JSON formátumba alakítjuk
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hiba történt a kérés feldolgozása közben');
      }
      return response.json(); // ha a válasz sikeres, JSON-ra alakítjuk
    })
    .then(() => {
      navigate("SzallasList"); // ha a kérés sikeres, navigálunk
    })
    .catch(error => {
      console.log("hiba:", error);
    });
  };
return (
    <div className="p-5 m-auto text-center content bg-lavender">
            <div>
                <h2>Szállás módosítása</h2>
                    <div className="card col-sm3 m-1 p-2">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Szállás neve:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="name" className="form-control" defaultValue={data.name} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Szállásadó neve:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="birth_date" className="form-control" defaultValue={data.hostname} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Cím:</label>
                                <div className="col-sm-9">
                                    <input type="text" name="world_ch_won" className="form-control" defaultValue={data.location} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Szállás Ára:</label>
                                <div className="col-sm-9">
                                    <input type="number" name="profile_url" className="form-control" Value={data.price} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group row pb-3">
                                <label className="col-sm-3 col-form-label">Minimum foglalható éjszakák:</label>
                                <div className="col-sm-9">
                                    <input type="number" name="image_url" className="form-control" defaultValue={data.minimum_nights} onChange={handleInputChange} />
                                </div>
                            </div>
                            <Link to="/" className="bi bi-backspace-fill fs-5 btn btn-danger"> Vissza</Link>&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="bi bi-send btn btn-success fs-5"> Küldés</button>
                        </form>
                        <div></div>
                        </div>
                    </div>
                </div>
            )
}