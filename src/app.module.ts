import PostgresForRoot from './postgres.config';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostgresForRoot,
    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
  ],
  // controllers: [AppController],
  providers: [],
})
export class AppModule { }
