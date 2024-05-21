import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlistlist } from './wishlistlists/entities/wishlistlist.entity';
import { Offer } from './offers/entities/offer.entity';

const PostgresForRoot = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',
    entities: [
        User,
        Wish,
        Wishlistlist,
        Offer
    ],
    synchronize: true,
});

export default PostgresForRoot;
