import { useRouter } from "next/router";
// useRouter allows us to access the query paramters from the URL

import Head from "next/head";

export default function Car({ car }) {
  // { car } destructed props from the return value of getStaticProps
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{car.id}</title>
      </Head>
      <h1>Hello {id}</h1>
      <img src={car.image} />
    </>
  );
}

// used for Static Site Generation
export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);

  const data = await req.json();

  return { props: { car: data } };
}
/* if SSR is needed use getServerSideProps, then copy and paste the content of getStaticProps,
the only difference is that every request, the code inside the function will run 
instead of during build time only */

/* because it is a dynamic route, 
next must know how many pages is associated with the dynamic route.
next must know the number of ids in advance.
the below function tells next which dynamic pages to render,
if the path does not exist, it renders 404. */

export async function getStaticPaths() {
  const req = await fetch("http://localhost:3000/cars.json");
  const data = await req.json();

  const paths = data.map(car => {
    return { params: { id: car } };
  });

  return { paths, fallback: false };
}
