## Installation

1. Install the requirements:
    ```bash
    cd backend/
    composer install
    ```
2. Fill the environment variables:
   * Rename .env.example file to .env inside your project root and fill the database information

3. Migrate tables:
    ```bash
    php artisan migrate
    ```
   
4. Generate keys:
   ```bash
   php artisan key:generate
   php artisan passport:install
   ```
   
5. Generate data from seeds:
   ```bash
   php artisan db:seed
   ```

## Usage

```bash
php artisan serve
```

## Pre-loaded models
Through seeds, 2 users and 50 products were generated.

### Users
1. Email: user1@user.com / Password: password
1. Email: user2@user.com / Password: password

### Products
All products were generated using random strings to the fields
