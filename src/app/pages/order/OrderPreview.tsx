import React from 'react';
import { useParams } from 'react-router-dom';

interface Order {
    id: number;
    userId: number;
    items: [
        {
            id: number;
            qty: number;
            product: {
                id: number;
                img: string;
                desc: string;
                name: string;
                price: number;
                menuName: string;
                priority: number;
                supplement: any[];
            }
        }
    ];
    comment: string;
    resId: number;
    price: number;
    fee: number;
    totalPrice: number;
    path: {
        to: {
            lat: number;
            long: number;
        },
        form: {
            lat: number;
            long: number;
        }
    },
    createdAt: string;
    status: string;
}

const OrderPreview: React.FC<{ order: Order }> = ({ order }) => {


    const {id}= useParams()

    
    return (
        <div>
            <h2>Order ID: {order.id}</h2>
            <h3>Items:</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.qty}x {item.product.name} - {item.product.price}
                    </li>
                ))}
            </ul>
            <div>
                <p>Comment: {order.comment}</p>
                <p>Price: {order.price}</p>
                <p>Fee: {order.fee}</p>
                <p>Total Price: {order.totalPrice}</p>
            </div>
            <div>
                <p>Path to: {order.path.to.lat}, {order.path.to.long}</p>
                <p>Path from: {order.path.form.lat}, {order.path.form.long}</p>
            </div>
            <div>
                <p>Created at: {order.createdAt}</p>
                <p>Status: {order.status}</p>
            </div>
        </div>
    );
};

export default OrderPreview