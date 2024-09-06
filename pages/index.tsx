import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Referral, { ReferralProps } from "../components/Referral"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const referrals = await prisma.referral.findMany({
    select: {
      id: true,
      referrerId: true,
    },
  });
  
  return {
    props: { referrals },
    revalidate: 10,
  };
};


type Props = {
  referrals: ReferralProps[]
}

const Blog: React.FC<Props> = ({ referrals }) => {
  const [id, setId] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, referrerId: '666666' }),
      });
      if (response.ok) {
        setId('');
        // Optionally, you can refresh the referrals list here
      } else {
        console.error('Failed to save referral');
      }
    } catch (error) {
      console.error('Error saving referral:', error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit">Save Referral</button>
        </form>
      </div>
      <div className="page">
        <h1>Referrals</h1>
        <main>
          {referrals.map((referral) => (
            <div key={referral.id} className="referral">
              <Referral referral={referral} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export default Blog
