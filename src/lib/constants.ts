export enum VerticalDirection {
  TOP = "top",
  BOTTOM = "bottom",
}
export enum HorizontalDirection {
  LEFT = "left",
  RIGHT = "right",
}

export enum Direction {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM_LEFT = "bottom_left",
  BOTTOM_RIGHT = "bottom_right",
}

export class AppContants {
  public static ParseSessionCookieName = "parse_session_cookie";

  public static strategyOptions = [
    { label: "Invest", value: "Invest" },
    { label: "Develop", value: "Develop" },
    { label: "Letter of support", value: "LOS" },
  ];

  public static groupOptions = [
    { label: "Accelerator", value: "Accelerator" },
    { label: "Incubator", value: "Incubator" },
    { label: "Venture Capital", value: "Venture Capital" },
    { label: "Individual/Angel", value: "Individual/Angel" },
    { label: "Private Equity Firm", value: "Private Equity Firm" },
  ];

  public static investmentTerm = [
    { label: "Long-term", value: "Long-term" },
    { label: "Mid-term", value: "Mid-term" },
    { label: "Short-term", value: "Short-term" },
  ];
}
