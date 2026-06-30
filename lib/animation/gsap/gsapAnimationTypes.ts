type GsapAnimationHandle = Readonly<{
  eventCallback: (type: string, callback: (() => void) | null) => GsapAnimationHandle;
  kill: () => void;
}>;

export type GsapTweenTarget = object | string | null;

export type GsapTweenVars = Record<
  string,
  string | number | boolean | (() => void) | object | undefined
>;

export type GsapTween = GsapAnimationHandle;

export type GsapTimeline = GsapAnimationHandle & {
  add: (child: GsapAnimationHandle | (() => void), position?: string | number) => GsapTimeline;
  to: (targets: GsapTweenTarget, vars: GsapTweenVars, position?: string | number) => GsapTimeline;
};
