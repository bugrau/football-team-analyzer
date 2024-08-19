// pages/competitions/[id].js

import { useRouter } from 'next/router';
import TeamsList from '../../components/TeamsList';

const CompetitionDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the competition ID from the URL

  return (
    <div>
      <h1>Competition Details</h1>
      <TeamsList competitionId={id} />
    </div>
  );
};

export default CompetitionDetails;
