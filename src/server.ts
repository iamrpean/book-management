import app from './app';
import { ENV } from './config/env';
import { connectMongo } from './config/mongo';


const PORT = ENV.PORT;

const startServer = async () => {
    await connectMongo();

    app.listen(ENV.PORT, () => {
        console.log(`Server running at http://localhost:${ENV.PORT}`);
    });
};

startServer();