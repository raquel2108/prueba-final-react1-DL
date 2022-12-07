
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


 function MiApi() {
    const [personajes, setPersonajes] = useState([]);
    const [tablaPersonajes, setTablaPersonajes] = useState ([]);
    const [busqueda, setBusqueda] = useState ("");
    

    const peticionGet= async()=>{
        await axios.get("https://digimon-api.vercel.app/api/digimon")
        .then(response =>{
            setPersonajes(response.data);
            setTablaPersonajes(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      };
    
    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaPersonajes.filter((elemento)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento;
            }
        });
        setPersonajes(resultadosBusqueda);
    }

    useEffect(()=>{
    peticionGet();
    
    }, [])
  
  return (
    <div className="app">
        
        <div className="containerInput inputBuscar">
            <input
            className="form-control"
            value={busqueda}
            placeholder="Buscar por nombre"
            onChange={handleChange}
            />
        <button className="btn btn-primary">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>

        </button>
        </div>

        <div className="table-responsive">
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Nivel</th>
                    </tr>
                </thead>

                <tbody>
                    {personajes &&
                     personajes.map((personaje)=>(
                        <tr key={personaje.name}>
                           <td>{personaje.name}</td>
                           <td>{personaje.img}</td>
                           <td>{personaje.level}</td>

                        </tr>
                     ))}
                </tbody>
            </table>

        </div>

    </div>
    )

}

export default MiApi; 