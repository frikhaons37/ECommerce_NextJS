'use client'
import React, { useState, useEffect } from 'react';
import UserAvatar from '../UserAvatar';
import CardBoxModal from '../Modal';
import Buttons from '../Buttons';
import Button from '../Button';
import { mdiEye, mdiTrashCan } from '@mdi/js';

const AreaUsersList = ({role}) => {
    const [users, setUsers] = useState([]);
    const [isModalInfoActive, setIsModalInfoActive] = useState(false);
    const [isModalTrashActive, setIsModalTrashActive] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const getUsers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/user`);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    useEffect(() => {
        getUsers()
            .then(data => setUsers(data.filter(user => user.role === role)))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleModalAction = () => {
        setIsModalInfoActive(false);
        setIsModalTrashActive(false);
        // Réinitialise l'utilisateur à supprimer après confirmation ou annulation
        setUserToDelete(null);
    };

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/user/${userId}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                throw new Error('Failed to delete user');
            }
            // Rafraîchit la liste des utilisateurs après suppression réussie
            const updatedUsers = await getUsers();
            setUsers(updatedUsers.filter(user => user.role === role));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        // Cache le modal après la suppression
        handleModalAction();
    };

    return (
        <>
            <CardBoxModal
                title="Sample modal"
                buttonColor="info"
                buttonLabel="Done"
                isActive={isModalInfoActive}
                onConfirm={handleModalAction}
                onCancel={handleModalAction}
            >
                <p>
                    Lorem ipsum dolor sit amet <b>adipiscing elit</b>
                </p>
                <p>This is sample modal</p>
            </CardBoxModal>

            <CardBoxModal
                title="Please confirm"
                buttonColor="danger"
                buttonLabel="Confirm"
                isActive={isModalTrashActive}
                onConfirm={() => deleteUser(userToDelete)} // Appelle deleteUser avec l'ID de l'utilisateur à supprimer
                onCancel={handleModalAction}
            >
                <p>
                    Est-ce que vous voulez supprimer cet utilisateur ?
                </p>
                <p>Si oui, cliquez sur Confirmer.</p>
            </CardBoxModal>

            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border-b-0 lg:w-6 before:hidden">
                                <UserAvatar username={user.name} className="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="before:hidden lg:w-1 whitespace-nowrap">
                                <Buttons type="justify-start lg:justify-end" noWrap>
                                    <Button
                                        color="info"
                                        icon={mdiEye}
                                        onClick={() => setIsModalInfoActive(true)}
                                        small
                                    />
                                    <Button
                                        color="danger"
                                        icon={mdiTrashCan}
                                        onClick={() => {
                                            setIsModalTrashActive(true);
                                            // Stocke l'ID de l'utilisateur à supprimer
                                            setUserToDelete(user._id);
                                        }}
                                        small
                                    />
                                </Buttons>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AreaUsersList;
