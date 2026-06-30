import { loadGsap, type GsapModule } from "@/lib/animation/gsap/loadGsap";

export function runWithGsap<T>(callback: (gsap: GsapModule) => T | Promise<T>): Promise<T> {
  return loadGsap().then((gsap) => callback(gsap));
}
