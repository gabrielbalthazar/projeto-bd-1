import cors from 'cors';
import express from 'express';
import doctorRouter from './routes/doctorRouter.js';
import generateRouter from './routes/generateRouter.js';
import inventoryRouter from './routes/inventoryRouter.js';
import medicineLeaveRouter from './routes/medicineLeaveRoute.js';
import medicineRouter from './routes/medicineRouter.js';
import meetingRouter from './routes/meetingRouter.js';
import patientRouter from './routes/patientRouter.js';
import pescriptionRouter from './routes/prescriptionRouter.js';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/doctors', cors(), doctorRouter);
app.use('/api/generate', cors(), generateRouter);
app.use('/api/inventory', cors(), inventoryRouter);
app.use('/api/medicine-leave', cors(), medicineLeaveRouter);
app.use('/api/medicine', cors(), medicineRouter);
app.use('/api/meeting', cors(), meetingRouter);
app.use('/api/patients', cors(), patientRouter);
app.use('/api/prescription', cors(), pescriptionRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
