import {resolve} from 'path';
import express from 'express';
const app = express();
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'tips.html'));
});

app.listen(3000, () => {
  console.log(
    'Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it'
  );
});
