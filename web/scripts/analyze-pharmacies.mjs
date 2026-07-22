import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(dir, "../src/data/pharmacies.json"), "utf8"));
const cities = {};
for (const p of data.pharmacies) {
  cities[p.city] = (cities[p.city] || 0) + 1;
}
console.log(JSON.stringify({
  declared: data.count,
  actual: data.pharmacies.length,
  cities,
  onDuty: data.pharmacies.filter((p) => p.is_on_duty).length,
}, null, 2));
