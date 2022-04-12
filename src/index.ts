import { RAW } from "./reativity/enum";
import { reactive, toRaw } from "./reativity/reactive";

const obs = reactive({
  a: 1
})

console.log(obs[RAW])