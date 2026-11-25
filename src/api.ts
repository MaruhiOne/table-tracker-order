import { supabase } from './lib/supabase';
import type { MenuItem, Order, OrderStatus, OrderType, PaymentMethod } from './types';
export async function getMenu(){const {data,error}=await supabase.from('menu_items').select('*').eq('active',true).order('name');if(error)throw error;return data as MenuItem[]}
export async function createOrder(input:{customer_name:string;phone:string;address?:string;special_notes?:string;order_type:OrderType;payment_method:PaymentMethod;items:{menu_item_id:string;quantity:number;notes?:string}[]}){const {data,error}=await supabase.rpc('create_customer_order',{payload:input});if(error)throw error;return data as {id:string;order_number:string;tracking_token:string}}
export async function getTrackedOrder(token:string){const {data,error}=await supabase.rpc('get_order_by_tracking_token',{token_input:token});if(error)throw error;return data as Order}
export async function getOrders(){const {data,error}=await supabase.from('orders').select('*,order_items(*)').order('created_at',{ascending:false});if(error)throw error;return data as Order[]}
export async function updateOrderStatus(id:string,status:OrderStatus){const {data,error}=await supabase.from('orders').update({status}).eq('id',id).select().single();if(error)throw error;return data as Order}
export async function signIn(email:string,password:string){const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error}
