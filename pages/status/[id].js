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
  console.log(`Building slug: ${context}`);
  const { params } = context;
  const { id } = params;

  console.log(id);

  const querySnapshot = await firestore.collection("devits").doc(id).get();

  console.log(querySnapshot);

  console.log(querySnapshot);
  const data = querySnapshot.data();
  console.log(data);
  const { createdAt } = data;
  console.log(createdAt);
  console.log(+createdAt.toDate());
  const props = {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
  return { props };
}
