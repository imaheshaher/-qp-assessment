import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception-filter';
import { AuthModule } from './auth/auth.module';
import { GroceryModule } from './grocery/grocery.module';
import { GroceryItem } from './grocery/entities/grocery.entity';
import { JwtMiddleware } from './auth/jwt-middleware';
import { OrderItem } from './grocery/entities/ordered-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5436,
      username: 'postgres',
      password: 'root',
      database: 'inventory',
      entities: [User, GroceryItem, OrderItem],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    GroceryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('/auth/login', { path: '/users', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
