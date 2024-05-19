'use client';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateOrder, deleteOrder } from '@/services/OrderService';
import { ShoppingCart } from "lucide-react";

const ListOrders = ({ orders }) => {
    const [orderData, setOrderData] = useState(orders);

    const onChangeInput = (e, _id) => {
        const { name, value } = e.target;
        const editData = orderData.map((item) =>
            item._id === _id && name ? { ...item, [name]: value } : item
        );
        setOrderData(editData);
        updateOrder(_id, value);
    };

    const statusColors = {
        'Not processed': 'bg-pink-500',
        Processing: 'bg-blue-500',
        Shipped: 'bg-green-500',
        Delivered: 'bg-lime-500',
        Cancelled: 'bg-gray-500',
    };

    const handleDeleteOrder = async (_id) => {
        if (!window.confirm('Are you sure to delete')) {
            return;
        }
        await deleteOrder(_id)
            .then(() => {
                console.log('Successfully deleted!');
                setOrderData((prevOrders) => prevOrders.filter((order) => order._id !== _id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
       
        <div className="overflow-x-auto">
                  <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"> <center>Liste Des Commandes</center></h1>

            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Client</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" style={{ minWidth: '550px' }}>Products</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orderData.map(({ _id, status, createdAt, client, total, lineOrder }, ind) => (
                        <tr key={ind} className="odd:bg-gray-50">
                            <td className="whitespace-nowrap px-4 py-2">
                                <span onClick={() => { handleDeleteOrder(_id); }}>
                                    <DeleteIcon style={{ color: "red" }} />
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2">
                                <select
                                    name="status"
                                    value={status}
                                    onChange={(e) => onChangeInput(e, _id)}
                                    className={`badge ${statusColors[status] || 'bg-gray-400'} text-white`}
                                >
                                    <option value="Not processed">Not processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2">{new Date(createdAt).toLocaleDateString()}</td>
                            <td className="whitespace-nowrap px-4 py-2">{client}</td>
                            <td className="whitespace-nowrap px-4 py-2">{total}</td>
                            <td className="whitespace-nowrap px-4 py-2" style={{ display: 'flex', flexDirection: 'column' }}>
                                {lineOrder.map((value, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <img src={value?.articleID?.imageart} alt="" width="35" height="35" />
                                        </div>
                                        <div>Quantity: {value.quantity}</div>
                                        <div>Total Price: {value.totalPrice}</div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrders;
