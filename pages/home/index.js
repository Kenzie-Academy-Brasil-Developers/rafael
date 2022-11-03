import { renderCards } from "../../script/render.js";
import { listAllSectors } from "../../script/ requisitions.js"
const request = await listAllSectors()
renderCards(request)