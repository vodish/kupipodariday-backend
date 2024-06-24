import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

export const PostgresConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'student',
  password: process.env.POSTGRES_PASSWORD || 'student',
  database: process.env.POSTGRES_DB || 'kupipodariday',
  // entities: ['src/**/enities/*.entity.{ts,js}'],
  entities: [User, Wish, Wishlist, Offer],
  synchronize: true,
});
