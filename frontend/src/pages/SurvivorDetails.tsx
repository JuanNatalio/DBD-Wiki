import { useParams } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import { CHARACTER } from "../consts/characters";

const SurvivorDetails = () => {
  const { id } = useParams();
  const survivorId = id ? parseInt(id, 10) : NaN;
  const { survivor } = CHARACTER;

  return <CharacterDetails characterType={survivor} id={survivorId} />;
};

export default SurvivorDetails;
