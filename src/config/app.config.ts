import { ConfigModule } from '@nestjs/config';

export const JWT_SECRET = process.env.JWT_SECRET || 'some-secrett';
export const BCRIPT_SALT = parseInt(process.env.BCRIPT_SALT) || 10;

export const envConfig = () => ({
  salt: {
    bcrypt: BCRIPT_SALT,
    jwt: JWT_SECRET,
  }
});

export const AppConfig = ConfigModule.forRoot({
  load: [envConfig],
  isGlobal: true, // глобальный модуль, можно не импортировать в каждом модуле
})

