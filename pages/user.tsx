//страница для ввода данных пользователя и сохранения в базу
'use client';

import React, { useState } from "react";
import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";
// import { createUser } from "../lib/api";

const User: React.FC = () => {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        avatar: '',
        username: '',
        referrerId: '',
        level: 0,
        CoreBalance: 0,
        WalletBalance: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: name === 'level' || name === 'CoreBalance' || name === 'WalletBalance' 
                ? parseFloat(value) 
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                console.log('User saved successfully');
                // Optionally, redirect or clear the form here
                //clear form
                setUserData({
                    id: '',
                    name: '',
                    avatar: '',
                    username: '',
                    referrerId: '',
                    level: 0,
                    CoreBalance: 0,
                    WalletBalance: 0
                });
            } else {
                console.error('Failed to save user');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/user?id=${userData.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else if (response.status === 404) {
                console.error('User not found');
                setUserData({
                    id: userData.id,
                    name: '',
                    avatar: '',
                    username: '',
                    referrerId: '',
                    level: 0,
                    CoreBalance: 0,
                    WalletBalance: 0
                });
            } else {
                throw new Error('Failed to fetch user');
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={userData.id}
                    onChange={handleChange}
                    placeholder="Enter your ID"
                />
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                />
                <input
                    type="text"
                    name="avatar"
                    value={userData.avatar}
                    onChange={handleChange}
                    placeholder="Enter your Avatar URL"
                />
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Enter your Username"
                />
                <input
                    type="text"
                    name="referrerId"
                    value={userData.referrerId}
                    onChange={handleChange}
                    placeholder="Enter your Referrer ID"
                />
                <input
                    type="number"
                    name="level"
                    value={userData.level}
                    onChange={handleChange}
                    placeholder="Enter your Level"
                />
                <input
                    type="number"
                    name="CoreBalance"
                    value={userData.CoreBalance}
                    onChange={handleChange}
                    placeholder="Enter your Core Balance"
                />
                <input
                    type="number"
                    name="WalletBalance"
                    value={userData.WalletBalance}
                    onChange={handleChange}
                    placeholder="Enter your Wallet Balance"
                />
                <button type="submit">Submit</button>
            </form>
            <form onSubmit={handleCheck}>
                <input
                    type="text"
                    name="id"
                    value={userData.id}
                    onChange={handleChange}
                    placeholder="Enter your ID"
                />
                <button type="submit">Check</button>
            </form>
            {userData.name ? (
                <div>
                    <h2>User Data:</h2>
                    <p>ID: {userData.id}</p>
                    <p>Name: {userData.name}</p>
                    <p>Avatar: {userData.avatar || 'N/A'}</p>
                    <p>Username: {userData.username || 'N/A'}</p>
                    <p>Referrer ID: {userData.referrerId || 'N/A'}</p>
                    <p>Level: {userData.level}</p>
                    <p>Core Balance: {userData.CoreBalance}</p>
                    <p>Wallet Balance: {userData.WalletBalance}</p>
                </div>
            ) : userData.id ? (
                <p>User not found</p>
            ) : null}
        </div>
    );
}

export default User;

