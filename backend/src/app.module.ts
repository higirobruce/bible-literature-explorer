import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassagesModule } from './passages/passages.module';
import { SearchModule } from './search/search.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { EntitiesModule } from './entities/entities.module';
import { UserModule } from './user/user.module';
import { LexiconModule } from './lexicon/lexicon.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/ble'),
    PassagesModule,
    SearchModule,
    DiscoveryModule,
    EntitiesModule,
    UserModule,
    LexiconModule,
  ],
})
export class AppModule {}
