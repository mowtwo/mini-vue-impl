import { reactive, toRaw } from "./reativity";
import { effect } from "./reativity/effect";

const raw = (reactive({
  a: 1
}))

effect(() => {
  console.log(raw.a)
})

raw.a++
raw.a++
raw.a++
raw.a++