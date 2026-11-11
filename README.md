# Badminton Trade

A peer-to-peer marketplace for buying and selling second-hand badminton equipment.

Users can post product listings, browse available items, and contact sellers directly to arrange transactions.

## Features

- User registration and login
- Session-based authentication
- Create, edit, and delete product listings
- Upload product images
- Search and filter products
- View product details

## Tech Stack

**Framework**
- AdonisJS - Node.js web framework

**View Engine**
- Edge - template engine for Node.js

**UI**
- Semantic UI

**Database**
- MySQL
- Lucid ORM

**Language**
- TypeScript

## Prerequisites
- Node.js
- MySQL

## Installation
```bash
git clone https://github.com/pongphol424/secondhand-badminton-trade.git
cd secondhand-badminton-trade
npm install
cp .env.example .env
node ace generate:key
```

## Database Setup

1. Create a database:

   ```sql
   CREATE DATABASE project_db;
   ```

2. Set your credentials in `.env` (see Configuration below).

3. Run migrations and seeders:

   ```bash
   node ace migration:run
   node ace db:seed
   ```

## Configuration

| Variable      | Description                  | Example        |
|---------------|------------------------------|----------------|
| `PORT`        | Server port                  | `3333`         |
| `APP_KEY`     | Secret key (auto-generated)  | —              |
| `NODE_ENV`    | Environment                  | `development`  |
| `DB_HOST`     | MySQL host                   | `127.0.0.1`    |
| `DB_PORT`     | MySQL port                   | `3306`         |
| `DB_USER`     | MySQL user                   | `root`         |
| `DB_PASSWORD` | MySQL password               |                |
| `DB_DATABASE` | Database name                | `project_db`   |


## Usage

Start the development server:

```bash
npm run dev
```

Open http://localhost:3333 in your browser.

Build and run for production:

```bash
npm run build
cd build
npm ci --omit=dev
node bin/server.js
```