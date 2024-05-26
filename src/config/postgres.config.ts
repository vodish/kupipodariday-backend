import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';



export const PostgresConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER || 'student',
    password: process.env.PG_PASSWORD || 'student',
    database: process.env.PG_DB || 'kupipodariday',
    // entities: ['src/**/enities/*.entity.{ts,js}'],
    entities: [User, Wish, Wishlist, Offer],
    synchronize: true,
});
