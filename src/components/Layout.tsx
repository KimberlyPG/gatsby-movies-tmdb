import React from 'react'
import Topbar from './Topbar'
import { PageProps } from 'gatsby';

interface Props{
  children?: React.ReactNode
}

const Layout: React.FC<Props> = props => {
return (
    <div>
        <Topbar />
        {props.children}
    </div>
  )
}

export default Layout;