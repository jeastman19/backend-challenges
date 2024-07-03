import { app } from './app';
import { connectDB } from './config/mongodb';

const port = 3000;

const startServer = async () => {
    if (process.env.NODE_ENV !== 'test') {
        await connectDB();
    }

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

startServer();
