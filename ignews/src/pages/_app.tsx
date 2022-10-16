// Carregado toda vez que tiver uma troca de página

import { AppProps } from 'next/app'

import '../../styles/global.scss'
import Header from '../components/header';


function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <Header />
         <Component {...pageProps} />
      </>
   );
}

export default MyApp;
