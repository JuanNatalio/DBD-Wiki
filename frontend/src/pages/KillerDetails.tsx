import { useParams } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import { CHARACTER } from "../consts/characters";

const KillerDetails = () => {
  const { id } = useParams();
  const killerId = id ? Number(id) : NaN;
  const { killer } = CHARACTER;

  return <CharacterDetails characterType={killer} id={killerId} />;
};
export default KillerDetails;
