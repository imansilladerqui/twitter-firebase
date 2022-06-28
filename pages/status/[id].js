import Devit from "components/Devit";

import { useRouter } from "next/router";
import { firestore } from "firebase/admin";

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  return <Devit {...props} />;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "70KGKLFLyWJmj6ojvu8F" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  const querySnapshot = await firestore.collection("devits").doc(id).get();
  const data = querySnapshot.data();
  const { createdAt } = data;
  const props = {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
  return { props };
}
