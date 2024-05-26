import { ConfigModule } from '@nestjs/config';

export const envConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    url: process.env.DATABASE_URL || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'student',
    password: process.env.DATABASE_PASSWORD || 'student',
    database: process.env.DATABASE_NAME || 'kupipodariday',
    // entities: [User, Wish, Wishlist, Offer],
    synchronize: true,
  },
  salt: {
    bcrypt: parseInt(process.env.BCRIPT_SALT) || 10,
    jwt: process.env.JWT_SECRET || 'some-secrett',
  }
});

export const AppConfig = ConfigModule.forRoot({
  load: [envConfig],
  isGlobal: true, // глобальный модуль, можно не импортировать в каждом модуле
})
