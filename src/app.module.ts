import PostgresForRoot from './postgres.config';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistlistsModule } from './wishlistlists/wishlistlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PostgresForRoot,
    AuthModule,
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistlistsModule,
  ],
  // controllers: [AppController],
  providers: [],
})
export class AppModule { }
