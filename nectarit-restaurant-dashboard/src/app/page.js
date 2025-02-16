"use client"; 

import * as React from 'react';
import Image from "next/image";
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menu',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />
  },
  // {
  //   segment: '',
  //   title: 'Orders',
  //   icon: <ShoppingCartIcon />,
  // },
  // {
  //   segment: '',
  //   title: 'Sales',
  //   icon: <DescriptionIcon />,
  // }
];

function useDemoRouter(initialPath){
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Home(props) {
  const { window } = props;
  
  const demoWindow = window ? window() : undefined;
  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider
      navigation={NAVIGATION}
     router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="https://www.svgrepo.com/show/58017/restaurant-symbol-of-cutlery-in-a-circle.svg" alt="Restaurant logo" />,
        title: 'Nectarit Restaurant',
      }}
    >
      <DashboardLayout>
      <PageContainer style={{marginLeft: 0}}>      
      <Dashboard/>
       
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        padding : 20
      }}>
      
    </div>    */}
    </PageContainer>
       </DashboardLayout>
    
    </AppProvider>
  );
}
