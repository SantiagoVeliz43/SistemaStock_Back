import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductoModule } from './producto/producto.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [UserModule, CategoryModule, ProductoModule, ClientModule, AuthModule, OrderModule, OrderItemModule],
})
export class AppModule {}
