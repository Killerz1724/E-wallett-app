type ChangeLogType = {
  version: number;
  list: string[];
}[];

export const ChangeLogs: ChangeLogType = [
  {
    version: 1.1,
    list: [
      "Fixed exchange rates 'from' can display 0 but it should not",
      "Added Rewards feature",
      "User can now spin the wheel to get rewards",
      "Redesigned mobile sidebar",
      "Added 'more' option on the mobile navbar",
    ],
  },
  {
    version: 1.0,
    list: [
      "Redesigned mobile sidebar to bottom",
      "Added night mode",
      "Fixed where user wallet number not changing",
      "Adjusted header alignment",
      "Adjusted transactions table pagination alignment for mobile",
      "Fixed where exchange rates 'from' result not changing",
      "Adjusted 'x' position on modal",
    ],
  },
  {
    version: 0.8,
    list: ["Initial release"],
  },
];
