import { create } from 'zustand';
import type { CartLine, MenuItem } from '../types';
type CartState={ lines:CartLine[]; add:(item:MenuItem)=>void; setQuantity:(id:string,q:number)=>void; clear:()=>void };
export const useCart=create<CartState>((set)=>({lines:[],add:(item)=>set(s=>{const found=s.lines.find(l=>l.item.id===item.id);return {lines:found?s.lines.map(l=>l.item.id===item.id?{...l,quantity:l.quantity+1}:l):[...s.lines,{item,quantity:1}]}}),setQuantity:(id,q)=>set(s=>({lines:q<=0?s.lines.filter(l=>l.item.id!==id):s.lines.map(l=>l.item.id===id?{...l,quantity:q}:l)})),clear:()=>set({lines:[]})}));
