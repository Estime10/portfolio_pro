export type MainNavPanelMotion = Readonly<{
  closeStaggerFrom: "start" | "end";
  closeToX: number;
  openFromX: number;
  openStaggerFrom: "start" | "end";
}>;

export const MAIN_NAV_DESKTOP_LEADING_MOTION: MainNavPanelMotion = {
  openFromX: 32,
  openStaggerFrom: "end",
  closeToX: 32,
  closeStaggerFrom: "start",
};

export const MAIN_NAV_DESKTOP_TRAILING_MOTION: MainNavPanelMotion = {
  openFromX: -32,
  openStaggerFrom: "start",
  closeToX: -32,
  closeStaggerFrom: "end",
};

export const MAIN_NAV_MOBILE_PANEL_MOTION: MainNavPanelMotion = {
  openFromX: 32,
  openStaggerFrom: "end",
  closeToX: 32,
  closeStaggerFrom: "start",
};
