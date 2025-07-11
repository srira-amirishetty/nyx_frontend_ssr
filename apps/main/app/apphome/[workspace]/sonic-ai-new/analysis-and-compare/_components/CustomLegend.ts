const getOrCreateLegendList = (chart: any, id: string) => {
  const legendContainer: HTMLElement | any = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

type ItemType = {
  index: number;
  datasetIndex: number;
  fillStyle: string;
  strokeStyle: string;
  text: string;
  hidden: string | boolean;
  visibility?: boolean;
}

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart: any, args: any, options: { containerID: string; classNamesText: string; onClick: (e: Event, item: ItemType, items: Array<ItemType>) => void; }) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach(
      (item: ItemType) => {
        const li = document.createElement("li");
        li.className = "flex flex-row mr-2.5 items-center cursor-pointer";

        li.onclick = (e) => {
          if (options.onClick) {
            options.onClick(e, {...item, visibility: !chart.isDatasetVisible(item.datasetIndex) }, items);
          }

          const { type } = chart.config;
          if (type === "pie" || type === "doughnut") {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex)
            );
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.className = "relative h-2.5 w-[60px] mr-2 z-0";

        const lineSpan = document.createElement("span");
        lineSpan.className = "h-[2px] w-full absolute inset-0 m-auto z-10";
        lineSpan.style.background = item.fillStyle;
        boxSpan.appendChild(lineSpan);

        const circleSpan = document.createElement("span");
        circleSpan.className =
          "h-2.5 w-2.5 rounded-full absolute inset-0 m-auto z-20";
        circleSpan.style.background = item.strokeStyle;
        boxSpan.appendChild(circleSpan);

        // Text
        const textContainer = document.createElement("p");
        textContainer.className = options.classNamesText;
        textContainer.style.textDecoration = item.hidden ? "line-through" : "";

        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      }
    );
  },
};
