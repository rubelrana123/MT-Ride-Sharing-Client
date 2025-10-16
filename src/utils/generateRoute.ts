import type { ISliderItem } from "@/types";

export default function generateRoute(sidebarItems: ISliderItem[]) {
  return sidebarItems.flatMap((section) =>
    section.items.map((item) => {
      return { path: item.url, Component: item.Component };
    })
  );
}
