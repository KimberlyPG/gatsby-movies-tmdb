import React, {ReactNode, FC} from 'react'

import Topbar from './Topbar'

interface Props{
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
return (
    <div>
        <Topbar />
        {children}
    </div>
  )
}

export default Layout;