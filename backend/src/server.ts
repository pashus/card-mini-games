import app from "./app";
import "dotenv/config";

const port = Number(process.env.SERVER_PORT);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
