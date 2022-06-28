import Devit from "components/Devit";
import Head from "next/head";
import { firestore } from "firebase/admin";
import { useRouter } from "next/router";

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  return (
    <>
      <Head>
        <title>Devit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Devit {...props} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "wJZIETdiaIhzynnh8LNG" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;
  console.log(params);

  try {
    return firestore
      .collection("devits")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        const props = {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
        console.log(props);
        return { props: props || {}, revalidate: 3600 };
      })
      .catch(() => {
        return { props: {} };
      });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
}
