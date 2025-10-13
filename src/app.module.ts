import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MedicoModule } from "./medico/medico.module";
import { ProductoModule } from "./producto/producto.module";
import { RecetaModule } from "./receta/receta.module";
import { DetallesRecetasModule } from "./detalles-recetas/detalles-recetas.module";
import { ComputadoraGeneralModule } from "./computadora-general/computadora-general.module";
import { PacienteModule } from "./paciente/paciente.module";
import { FarmaceuticoModule } from "./farmaceutico/farmaceutico.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    PacienteModule,
    MedicoModule,
    ProductoModule,
    RecetaModule,
    DetallesRecetasModule,
    ComputadoraGeneralModule,
    FarmaceuticoModule,
  ],
})
export class AppModule {}
