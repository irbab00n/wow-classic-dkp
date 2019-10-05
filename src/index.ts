import app from './app';
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`WoWanker Classic API V 0.0.1 starting up on port ${port}`);
});
