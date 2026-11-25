export type OrderStatus = 'draft'|'incoming'|'in_production'|'ready'|'out_for_delivery';
export type OrderType = 'dine_in'|'takeout'|'delivery';
export type PaymentMethod = 'cash'|'pix'|'credit_card'|'debit_card';
export interface MenuItem { id:string; category_id:string|null; name:string; description:string|null; price:number; image_url:string|null; active:boolean; }
export interface CartLine { item:MenuItem; quantity:number; notes?:string }
export interface OrderItem { id:string; order_id:string; menu_item_id:string|null; item_name:string; quantity:number; unit_price:number; subtotal:number; notes:string|null }
export interface Order { id:string; order_number:string; tracking_token:string; created_at:string; customer_name:string; phone:string; address:string|null; ticket:string|null; special_notes:string|null; order_type:OrderType; payment_method:PaymentMethod; status:OrderStatus; total:number; source:'web'|'whatsapp'; order_items?:OrderItem[] }
