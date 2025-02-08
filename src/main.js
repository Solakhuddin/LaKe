import { web } from "./application/web.js";
import { Logger } from "./application/logging.js";

web.listen(3000, () => {
  Logger.info("App Started At" + (new Date()).getTime);
})