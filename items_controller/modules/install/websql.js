[
  "create table if not exists items(id interger, name text, price text, currency text)",
  "create table if not exists orders(id interger, params text, status text)",
  "create table if not exists orderitem(orderid interger, itemid interger)"
]