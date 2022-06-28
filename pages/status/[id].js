import Devit from "components/Devit";

import { useRouter } from "next/router";

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  return <Devit {...props} />;
}

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { id } = params;

  const apiResponse = await fetch(`${process.env.API_URL}/api/devits/${id}`);
  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }

  if (res) {
    res.writeHead(301, { Location: "/home" }).end();
  }
}
