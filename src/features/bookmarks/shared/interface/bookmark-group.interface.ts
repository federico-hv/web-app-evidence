export interface IBookmarkGroup {
  id: string;
  name: string;
  total: number;
  private: boolean;
  saved?: boolean | null;
}
