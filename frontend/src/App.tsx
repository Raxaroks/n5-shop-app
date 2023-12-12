import { useEffect } from 'react';
import { AppConfig } from './config/app.config';
import { AppRouter } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect( () => {
    document.title = AppConfig().app.name;
  } );

	return (
		<>
      <AppRouter />
      <ToastContainer className='fs-12' />
    </>
	);
}

export default App;
