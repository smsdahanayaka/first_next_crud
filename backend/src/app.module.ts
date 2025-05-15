import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3308'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'db_task_manager',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnApplicationBootstrap {
  constructor(private connection: Connection) {}

  async onApplicationBootstrap() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Database connected successfully!');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }
}
