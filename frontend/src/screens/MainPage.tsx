import { AppConfig } from '../config/app.config';
import { Navigate, Route, Routes } from 'react-router-dom'
import { productRoutes } from '../routes';
import { HeaderComponent, Sidebar } from '../components';



export const MainPage = () => {
  const appName: string = AppConfig().app.name;

	return (
    <div className='app__container'>
      <HeaderComponent appName={ appName } />

      <main className="app__content">
        <Sidebar/>

        <section className="app__screen">
          <Routes>
            {
              productRoutes.map( ({ to, path, Component, Provider }) => (
                <Route key={ to } 
                  path={ path } 
                  element={
                    (Provider) 
                      ? (<Provider><Component /></Provider>)
                      : (<Component />)
                  }/>
              ) )
            }
            <Route path='*'
              element={<Navigate to={ productRoutes[0].to } replace />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};
