import React from "react";
import { adminProfile, dashboardList } from "@/hooks/ReactQueryHooks";
import { useQuery } from "@tanstack/react-query";
import StatisticsCard from "@/widgets/cards/StatisticsCard";
import MessageCard from "@/widgets/cards/MessageCard";
import ZoomableCard from "@/widgets/cards/ZoomableCard";
import RegistrationCards from "@/widgets/cards/Registrationcards";


export function Home() {


  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: adminProfile
  });
  const { data: dashboard } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardList(profile?.role)

  });
  return (
    <div className="mt-6">
      <StatisticsCard dashboard={dashboard}></StatisticsCard>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3 mt-6">
        <RegistrationCards dashboard={dashboard}></RegistrationCards>
        <ZoomableCard dashboard={dashboard}></ZoomableCard>
        <MessageCard dashboard={dashboard}></MessageCard>
      </div>
    </div>
  );
}

export default Home;
