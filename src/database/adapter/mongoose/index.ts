import { MongooseModule } from '@nestjs/mongoose';

export default MongooseModule.forRootAsync({
  useFactory: () => {
    const options = {
      uri: encodeURI(process.env.MONGODB_ENDPOINT ?? ''),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    return options;
  },
});
