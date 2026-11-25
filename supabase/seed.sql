insert into menu_categories(name,sort_order) values ('Mains',1),('Sides',2),('Drinks',3);
insert into menu_items(category_id,name,description,price) values
((select id from menu_categories where name='Mains'),'House Burger','Beef, cheddar, pickles and house sauce',18.90),
((select id from menu_categories where name='Mains'),'Garden Bowl','Seasonal vegetables, grains and herb dressing',16.50),
((select id from menu_categories where name='Sides'),'Crispy Fries','Sea salt and smoked paprika',6.50),
((select id from menu_categories where name='Drinks'),'Fresh Lemonade','Fresh lemon, mint and sparkling water',5.50);
