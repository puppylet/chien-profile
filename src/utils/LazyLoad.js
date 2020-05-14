import React, { Suspense } from 'react'

const LazyLoad = ({ component: Component, loader: Loader, ...rest }) => <>
  <Suspense fallback={Loader ? <Loader /> : <div />}>
    <Component {...rest} />
  </Suspense>
</>

export default LazyLoad
