import { useParams } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import { CHARACTER } from "../consts/characters";

const KillerDetails = () => {
  const { id } = useParams();
  const killerId = id ? parseInt(id, 10) : NaN;
  const { killer } = CHARACTER;

  return <CharacterDetails characterType={killer} id={killerId} />;
};
export default KillerDetails;
