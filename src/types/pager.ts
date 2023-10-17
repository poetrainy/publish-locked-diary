export type PagerPropsType = {
  prev: string | null;
  next: string | null;
  count: {
    current: number;
    pagesLength: number;
  };
};
