// pages/person/[id].js

import { useRouter } from 'next/router';
import PersonDetails from '../../components/PersonDetails';

const PersonPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Person Details</h1>
      {id && <PersonDetails personId={id} />}
    </div>
  );
};

export default PersonPage;
