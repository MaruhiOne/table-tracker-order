export const money = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
export const dateTime = (value:string) => new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short'}).format(new Date(value));
export const label = (value:string) => value.replaceAll('_',' ').replace(/\w/g,c=>c.toUpperCase());
