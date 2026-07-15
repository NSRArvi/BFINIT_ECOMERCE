import { useParams } from "react-router";

export default function useBasePath() {
  const { storeId } = useParams();
  return `/stores/${storeId}`;
}
