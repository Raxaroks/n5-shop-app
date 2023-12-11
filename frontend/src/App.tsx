import { useEffect } from 'react';
import { AppConfig } from './config/app.config';
import { AppRouter } from './routes';

function App() {
  useEffect( () => {
    document.title = AppConfig().app.name;
  } );

	return (
		<>
      <AppRouter />
    </>
	);
}

export default App;
