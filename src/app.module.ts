import { Module } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { PostgresConfig } from './config/postgres.config';
// import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfig,
    PostgresConfig,
    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
  ],
  providers: [],
})
export class AppModule {}
