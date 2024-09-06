import React from "react";

export type ReferralProps = {
  id: string;
  referrerId: string;
};

const Referral: React.FC<{ referral: ReferralProps }> = ({ referral }) => {
  return (
    <div>
      <h2>{referral.id} referred {referral.referrerId}</h2>
    </div>
  );
};

export default Referral;
