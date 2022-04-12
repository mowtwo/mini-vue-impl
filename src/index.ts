import { effect } from "./reativity/effect";
import { reactive } from "./reativity/reactive";

const o = reactive({
  count: 1
})

effect(() => {
  console.log('effect:', o.count)
})