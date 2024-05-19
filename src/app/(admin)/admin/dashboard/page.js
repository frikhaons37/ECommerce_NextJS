import React from "react";
import CardsAnalytics from "@/Components/admin/dashboard/cardsAnalytics";
const page = async () => {
  const clientsCountResp = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/user/analytics`,
    { cache: "no-store" }
  );
  const clientsCount = await clientsCountResp.json();
  console.log({ clientsCount });

  return (
    <div className="container">
      <CardsAnalytics clientsCount={clientsCount.count} />
    </div>
  );
};
export default page;
