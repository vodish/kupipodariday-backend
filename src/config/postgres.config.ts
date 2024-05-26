import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';
import { Offer } from '../offers/entities/offer.entity';

export const PostgresConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER || 'student',
    password: process.env.PG_PASSWORD || 'student',
    database: process.env.PG_DB || 'kupipodariday',
    entities: ['src/**/enities/*.entity.{ts,js}'],
    synchronize: true,
});
