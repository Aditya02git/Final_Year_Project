import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export function AppWrapper({ children }) {
  // const { user, login, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="loading loading-spinner loading-lg text-primary"></div>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
  //       <AuthSystem onLogin={login} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}