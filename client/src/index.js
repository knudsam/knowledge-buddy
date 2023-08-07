import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import client from './graphql';

import { AuthProvider } from './utils/AuthContext'; 

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';
import './assets/css/style.css';

import AdminLayout from 'layouts/Admin.js';
import AuthLayout from 'layouts/Auth.js';

const queryClient = new QueryClient(); 

ReactDOM.render(
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            <Route path="*" element={<Navigate to="/admin/index" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
