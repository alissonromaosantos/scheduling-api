import "dotenv/config";

import { app } from "./app";
import { env } from "./config/env";

function bootstrap() {
  const PORT = env.PORT || 3333;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}!`);
  });
}

bootstrap();