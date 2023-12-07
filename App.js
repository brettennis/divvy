import PurchaseList from './app/screens/PurchaseList';
import Header from './app/screens/Header';
import Footer from './app/screens/Footer';
import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function App() {

  return (
    <>
      <Header />
      <PurchaseList />
      <Footer />
    </>
  );
}