# Online Cow Selling Backend for Eid Ul Adha

Welcome to Digital Cow Hut! This README provides an overview of the application's routes and functionalities.

## Live Link

Visit the live application at [digital-cow-three.vercel.app](digital-cow-three.vercel.app).

## Application Routes

### User

- `GET` - `/api/v1/users`
- `GET` - `/api/v1/users/64e0515e72778d8949889099` (Single GET)
- `PATCH` - `/api/v1/users/64e0515e72778d8949889099`
- `DELETE` - `/api/v1/users/64e0515e72778d8949889099`

### Cows

- `POST` - `/api/v1/cows`
- `GET` - `/api/v1/cows`
- `GET` - `/api/v1/cows/64d5cc8450d90efb0e6775a3` (Single GET)
- `PATCH` - `/api/v1/cows/64d5cc8450d90efb0e6775a3`
- `DELETE` - `/api/v1/cows/64d5cc8450d90efb0e6775a3`

#### Pagination and Filtering Routes of Cows

- `GET` - `/api/v1/cows?pag=1&limit=10`
- `GET` - `/api/v1/cows?sortBy=price&sortOrder=asc`
- `GET` - `/api/v1/cows?minPrice=3000&maxPrice=7000`
- `GET` - `/api/v1/cows?location=Chattogram`
- `GET` - `/api/v1/cows?searchTerm=Cha`

### Orders

- `POST` - `/api/v1/orders`
- `GET` - `/api/v1/orders`
- `GET` - `/api/v1/orders/64e05cda56c4fe86b27a107a`

### Admin

- `POST` - `/api/v1/admins/create-admin`
  `POST` - `/api/v1/admins/login`

### Profile

- `GET` - `/api/v1/users/my-profile`
- `PATCH` - `/api/v1/users/my-profile`

### Auth

- `POST` - `/api/v1/auth/login`
- `POST` - `/api/v1/auth/signup`
- `POST` - `/api/v1/auth/refresh-token`
