import Head from "next/head"
import TopHeader from "./TopHeader"

const Tops = ({ header = false, title, desc, conLink, grid, extra }) => {
  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={conLink} />

        <meta name="robots" content="INDEX, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="Hadi" />
      </Head>

      {
        header && <>
          {grid && <img src="/images/grid/header-bg.jpg" loading="lazy" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />}
          <TopHeader />
          {extra && <div style={{ position: "absolute", top: 200, left: 0, width: "1px", height: "1px", boxShadow: `100px 100px 100rem 100px #31af98, 100px 0px 200px 10px #0f3f5d` }} />}

        </>
      }
    </>
  )
}

export default Tops