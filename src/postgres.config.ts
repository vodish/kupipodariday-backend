import { TypeOrmModule } from '@nestjs/typeorm';

const PostgresForRoot = TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',
    entities: [],
    synchronize: true,
});

export default PostgresForRoot;
