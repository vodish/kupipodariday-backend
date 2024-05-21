import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

const PostgresForRoot = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',
    entities: [
        User,
    ],
    synchronize: true,
});

export default PostgresForRoot;
