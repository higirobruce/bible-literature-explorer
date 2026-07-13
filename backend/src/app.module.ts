import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassagesModule } from './passages/passages.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble'),
    PassagesModule,
    SearchModule,
  ],
})
export class AppModule {}
