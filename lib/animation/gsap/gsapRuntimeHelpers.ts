import type {
  GsapTimeline,
  GsapTween,
  GsapTweenTarget,
  GsapTweenVars,
} from "@/lib/animation/gsap/gsapAnimationTypes";
import type { GsapModule } from "@/lib/animation/gsap/loadGsap";

export function createGsapTimeline(
  gsap: GsapModule,
  vars?: Parameters<GsapModule["timeline"]>[0],
): GsapTimeline {
  return gsap.timeline(vars) as GsapTimeline;
}

export function createGsapTween(
  gsap: GsapModule,
  target: GsapTweenTarget,
  vars: GsapTweenVars,
): GsapTween {
  return gsap.to(target, vars) as GsapTween;
}

export function createGsapFromToTween(
  gsap: GsapModule,
  target: GsapTweenTarget,
  fromVars: GsapTweenVars,
  toVars: GsapTweenVars,
): GsapTween {
  return gsap.fromTo(target, fromVars, toVars) as GsapTween;
}
