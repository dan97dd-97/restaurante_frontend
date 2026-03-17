import { useState, useEffect } from 'react'; {/* importamos los hooks de react */ }
import { Link } from 'react-router-dom'; {/* importamos el componente link de react-router-dom */ }
import { getRestaurants } from '../services/api'; {/* función que trae la lista de restaurantes desde la API. */ }

function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRestaurants()
            .then(data => {
                setRestaurants(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Cargando restaurantes...</div>;
    if (error) return <div className="alert alert-danger m-5 text-center">Error al cargar restaurantes: {error}</div>;

    return (
        <div className="container">
            <h1 className="mb-4">Restaurantes</h1>
            <div className="row">
                {restaurants.map(res => (
                    <div key={res.restauranteID} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{res.restaurante}</h5>
                                <p className="card-text text-muted">Barrio: {res.barrio}</p>
                                <Link to={`/restaurant/${res.restauranteID}`} className="btn btn-primary">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
