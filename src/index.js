import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 2000;
const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
