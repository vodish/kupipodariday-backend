import { Module } from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { WishlistlistsController } from './wishlistlists.controller';

@Module({
  controllers: [WishlistlistsController],
  providers: [WishlistlistsService]
})
export class WishlistlistsModule {}
