import app from './app';

const port = 3334;

app.listen(port, () => {
  console.log(`escutando na porta ${port}`);
  console.log(`http//localhost:${port}`);
});
