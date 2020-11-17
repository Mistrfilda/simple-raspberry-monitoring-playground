import { PaginatorItem } from "@/definitions/PaginatorItem";

function getBlankPaginatorItem(id: number): PaginatorItem {
  return {
    id: id,
    label: "...",
    offset: 0,
    disabled: true,
    isFirst: false,
    isLast: false,
    active: false
  };
}

export function getPaginator(
  offset: number,
  limit: number,
  linesCount: number
): PaginatorItem[] {
  const items: PaginatorItem[] = [];

  const lastItemNumber = Math.ceil(linesCount / limit);
  const currentActive = offset / limit + 1;

  //FIRST ELEMENT
  items.push({
    id: 1,
    label: "1",
    offset: 0,
    disabled: false,
    isFirst: true,
    isLast: linesCount < limit,
    active: offset === 0
  });

  //RETURN IF LESS THEN LIMIT OF LINES
  if (linesCount < limit) {
    return items;
  }

  //CALCULATE IF ITEMS ARE LESS THAN 7 * THIS.LIMIT AND RETURN
  if (lastItemNumber < 11) {
    for (let i = 2; i <= 11; i++) {
      if (lastItemNumber < i) {
        return items;
      }

      items.push({
        id: i,
        label: String(i),
        offset: limit * (i - 1),
        disabled: false,
        isFirst: false,
        isLast: linesCount <= limit * i,
        active: offset === limit * (i - 1)
      });
    }

    return items;
  }

  if (currentActive !== 1 && currentActive !== lastItemNumber) {
    //PUSH CURRENT ACTIVE
    items.push({
      id: currentActive,
      label: String(currentActive),
      offset: limit * (currentActive - 1),
      disabled: false,
      isFirst: false,
      isLast: linesCount <= limit * currentActive,
      active: offset === limit * (currentActive - 1)
    });
  }

  let rightValue = 0;
  let leftValue = 0;
  //PUSH NEIGHBORHOODS
  for (
    let currentActiveHelper = 0;
    currentActiveHelper < 2;
    currentActiveHelper++
  ) {
    //TO THE RIGHT
    rightValue = currentActive + (currentActiveHelper + 1);

    if (rightValue < lastItemNumber) {
      items.push({
        id: rightValue,
        label: String(rightValue),
        offset: limit * (rightValue - 1),
        disabled: false,
        isFirst: false,
        isLast: linesCount <= limit * rightValue,
        active: offset === limit * (rightValue - 1)
      });
    }

    //TO THE LEFT
    leftValue = currentActive + (currentActiveHelper + 1) * -1;
    if (leftValue > 1) {
      items.push({
        id: leftValue,
        label: String(leftValue),
        offset: limit * (leftValue - 1),
        disabled: false,
        isFirst: false,
        isLast: linesCount <= limit * leftValue,
        active: offset === limit * (leftValue - 1)
      });
    }
  }

  //LAST ELEMENT
  items.push({
    id: lastItemNumber,
    label: String(lastItemNumber),
    offset: limit * (lastItemNumber - 1),
    disabled: false,
    isFirst: false,
    isLast: linesCount <= limit * lastItemNumber,
    active: offset === limit * (lastItemNumber - 1)
  });

  //PUSH MIDDLE ELEMENT ON FIRST AND LAST PAGE
  if (items.length < 7) {
    const middleElement = Math.ceil(lastItemNumber / 2);

    items.push({
      id: middleElement,
      label: String(middleElement),
      offset: limit * (middleElement - 1),
      disabled: false,
      isFirst: false,
      isLast: linesCount <= limit * middleElement,
      active: false
    });

    //AROUND MIDDLE ELEMENT
    items.push(getBlankPaginatorItem(middleElement + 1));

    //AROUND MIDDLE ELEMENT
    items.push(getBlankPaginatorItem(middleElement - 1));

    //ON SECOND ELEMENT TO FIT LENGTH OF 9
    if (items.length === 7) {
      items.push(getBlankPaginatorItem(middleElement + 2));
      items.push(getBlankPaginatorItem(middleElement - 2));
    }

    if (items.length === 8) {
      if (currentActive < 5) {
        items.push(getBlankPaginatorItem(middleElement + 2));
      } else {
        items.push(getBlankPaginatorItem(middleElement - 2));
      }
    }
  } else {
    //PUSH VALUES AROUND FIRST AND LAST
    if (leftValue - 1 > 1) {
      items.push(getBlankPaginatorItem(leftValue - 1));
    }

    if (rightValue + 1 < lastItemNumber) {
      items.push(getBlankPaginatorItem(rightValue + 1));
    }

    if (items.length === 8) {
      if (rightValue + 1 < lastItemNumber) {
        items.push(getBlankPaginatorItem(rightValue + 2));
      } else {
        items.push(getBlankPaginatorItem(leftValue - 2));
      }
    }
  }

  items.sort(function(a: PaginatorItem, b: PaginatorItem) {
    if (a.id < b.id) {
      return -1;
    }

    return 1;
  });

  return items;
}
