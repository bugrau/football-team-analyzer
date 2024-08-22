// pages/_app.js
import '../src/app/globals.css'; // Adjusted path based on your file structure

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
