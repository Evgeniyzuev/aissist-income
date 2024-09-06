import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
// import Post, { PostProps} from "../components/Post"
import Referral, { ReferralProps } from "../components/Referral"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  // const feed = await prisma.post.findMany({
  //   where: { published: true },
  //   include: {
  //     author: {
  //       select: { name: true },
  //     },
  //   },
  // });
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
  // feed: PostProps[]
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
      {/* <div className="page">
        <h1>Public Feed</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div> */}
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
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
