import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurants, getDishes, getOrders, getCustomers } from '../services/api';

function RestaurantDetail() {
    const { id } = useParams();
    const [data, setData] = useState({ restaurant: null, dishes: [], orders: [], customers: [] });
    const [loading, setLoading] = useState(true);

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
            });
    }, [id]);

    if (loading) return <div className="text-center mt-5">Cargando detalles...</div>;
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
                <div className="col-md-6">
                    <section className="mb-5 px-3 py-4 bg-white border rounded shadow-sm">
                        <h3>Pedidos</h3>
                        <table className="table">
                            <thead>
                                <tr><th>ID</th><th>Fecha</th><th>Cliente ID</th></tr>
                            </thead>
                            <tbody>
                                {data.orders.map(o => (
                                    <tr key={o.pedidoID}>
                                        <td>#{o.pedidoID}</td>
                                        <td>{new Date(o.fecha).toLocaleDateString()}</td>
                                        <td>{o.clienteID}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className="col-md-6">
                    <section className="mb-5 px-3 py-4 bg-white border rounded shadow-sm">
                        <h3>Clientes de pedidos</h3>
                        <div className="row g-2">
                            {data.customers.map(c => (
                                <div key={c.clienteID} className="col-12 p-2 border-bottom">
                                    {c.nombre} {c.apellido1} - <small className="text-muted">{c.poblacion}</small>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetail;
