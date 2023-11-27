import PurchaseList from './app/screens/PurchaseList';
import Header from './app/screens/Header';
import Footer from './app/screens/Footer';
import { View } from 'react-native';

export default function App() {
  return (
    <>
      <Header />
      <PurchaseList />
      <Footer />
    </>
  );
}