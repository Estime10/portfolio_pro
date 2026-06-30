import { loadGsap, type GsapModule } from "@/lib/animation/gsap/loadGsap";

let isScrollToPluginRegistered = false;

export async function ensureGsapScrollToPlugin(gsap?: GsapModule): Promise<GsapModule> {
  const instance = gsap ?? (await loadGsap());

  if (!isScrollToPluginRegistered) {
    const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
    instance.registerPlugin(ScrollToPlugin);
    isScrollToPluginRegistered = true;
  }

  return instance;
}
