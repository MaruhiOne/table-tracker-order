import { Outlet, createRootRoute, createRoute, createRouter, Link, redirect } from '@tanstack/react-router';
import { supabase } from './lib/supabase';
import { MenuPage, CheckoutPage, TrackingPage, LoginPage, AdminOrdersPage } from './views';
const rootRoute=createRootRoute({component:()=> <><header className="topbar"><Link to="/" className="brand">TableTrack</Link><nav><Link to="/">Menu</Link><Link to="/checkout">Cart</Link><Link to="/admin/orders">Admin</Link></nav></header><main><Outlet/></main></>});
const menuRoute=createRoute({getParentRoute:()=>rootRoute,path:'/',component:MenuPage});
const checkoutRoute=createRoute({getParentRoute:()=>rootRoute,path:'/checkout',component:CheckoutPage});
const trackingRoute=createRoute({getParentRoute:()=>rootRoute,path:'/track/$token',component:TrackingPage});
const loginRoute=createRoute({getParentRoute:()=>rootRoute,path:'/admin/login',component:LoginPage});
const ordersRoute=createRoute({getParentRoute:()=>rootRoute,path:'/admin/orders',beforeLoad:async()=>{const {data}=await supabase.auth.getSession();if(!data.session)throw redirect({to:'/admin/login'})},component:AdminOrdersPage});
const routeTree=rootRoute.addChildren([menuRoute,checkoutRoute,trackingRoute,loginRoute,ordersRoute]);
export const router=createRouter({routeTree});
declare module '@tanstack/react-router' { interface Register { router: typeof router } }
