import * as React from "react"

import Home from "../components/Home"
import Layout from "../components/Layout"

import '../assets/global.css'

const IndexPage = () => {

  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Movies and Shows App</title>
