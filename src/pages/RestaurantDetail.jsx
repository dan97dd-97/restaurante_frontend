import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurants, getDishes, getOrders, getCustomers } from '../services/api';

function RestaurantDetail() {
    const { id } = useParams();
    const [data, setData] = useState({ restaurant: null, dishes: [], orders: [], customers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([getRestaurants(), getDishes(), getOrders(), getCustomers()])
            .then(([allRes, allDishes, allOrders, allCust]) => {
                const restaurant = allRes.find(r => r.restauranteID === parseInt(id));
                const dishes = allDishes.filter(d => d.restauranteID === parseInt(id));
                const orders = allOrders.filter(o => o.restauranteID === parseInt(id));
                const customerIds = new Set(orders.map(o => o.clienteID));
                const customers = allCust.filter(c => customerIds.has(c.clienteID));

                setData({ restaurant, dishes, orders, customers });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-5">Cargando detalles...</div>;
    if (error) return <div className="alert alert-danger m-5 text-center">Error al cargar detalles: {error}</div>;
    if (!data.restaurant) return <div className="alert alert-danger">Restaurante no encontrado</div>;

    return (
        <div className="container pb-5">
            <Link to="/" className="btn btn-secondary mb-4">← Volver</Link>
            <h1 className="text-primary mb-1">{data.restaurant.restaurante}</h1>
            <p className="text-muted mb-4">{data.restaurant.barrio}</p>

            <section className="mb-5">
                <h3>Platos</h3>
                <ul className="list-group">
                    {data.dishes.map(d => (
                        <li key={d.platoID} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{d.plato}</strong>
                                <p className="small mb-0 text-muted">{d.descripcion}</p>
                            </div>
                            <span className="badge bg-success rounded-pill">{d.precio}€</span>
                        </li>
                    ))}
                </ul>
            </section>

            <div className="row">
                <div className="col-12">
                    <section className="mb-5 px-3 py-4 bg-white border rounded shadow-sm">
                        <h3 className="mb-4">Pedidos por Cliente</h3>
                        <div className="row g-4">
                            {data.customers.map(c => {
                                const customerOrders = data.orders.filter(o => o.clienteID === c.clienteID);
                                return (
                                    <div key={c.clienteID} className="col-md-6 col-lg-6">
                                        <div className="card h-100 shadow-sm border-0 bg-white">
                                            <div className="card-body">
                                                <h5 className="card-title text-dark fw-bolder" style={{ fontSize: "1.3rem" }}>{c.nombre} {c.apellido1}</h5>
                                                <h6 className="card-subtitle mb-3 text-muted">{c.poblacion}</h6>

                                                <p className="mb-2 fw-semibold text-secondary" style={{ fontSize: "0.9rem" }}>Historial de Pedidos ({customerOrders.length}):</p>
                                                <div className="list-group list-group-flush border-top">
                                                    {customerOrders.map(o => (
                                                        <div key={o.pedidoID} className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between align-items-center">
                                                            <span className="fw-medium text-dark">Pedido #{o.pedidoID}</span>
                                                            <span className="badge bg-secondary rounded-pill">{new Date(o.fecha).toLocaleDateString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetail;
