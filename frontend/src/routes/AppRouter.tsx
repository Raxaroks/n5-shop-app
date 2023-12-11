
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { appRoutes } from './';

export const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <span>Loading...</span>
      }>
        <BrowserRouter>
          <Routes>
            {
              appRoutes.map(
                ({ to, path, Component }) => (
                  <Route key={ to } path={ path } element={ <Component/> } />
                )
              )
            }
            <Route path='/*' element={
              <Navigate to={ appRoutes[0].to } replace />
            }/>
          </Routes>
        </BrowserRouter>
      </Suspense>
  )
}

