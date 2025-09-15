import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MedicoModule } from './medico/medico.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [AuthModule, UserModule, MedicoModule, ProductoModule],
})
export class AppModule {}
