import React from "react";
import Router from "next/router";

export type UserProps = {
  id: string;
  name: string;
  avatar: string | null;
  username: string | null;
  referrerId: string | null;
  level: number;
  CoreBalance: number;
  WalletBalance: number;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div onClick={() => Router.push("/user/[id]", `/user/${user.id}`)}>
      <h2>{user.name}</h2>
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <p>Username: {user.username || "N/A"}</p>
      <p>Level: {user.level}</p>
      <p>Core Balance: {user.CoreBalance}</p>
      <p>Wallet Balance: {user.WalletBalance}</p>
      {user.referrerId && <p>Referred by: {user.referrerId}</p>}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
          cursor: pointer;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        div:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        img {
          max-width: 100px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default User;