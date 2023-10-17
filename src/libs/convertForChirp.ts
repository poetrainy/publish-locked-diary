import { MicroCMSArticleType } from "~/types/microCMS";

export const convertArticleToChirp = (data: string) => {
  return data.split("/");
};

export const chirpsSummarizeByDate = (articles: MicroCMSArticleType[]) => {
  /** article の日付のみを抽出した配列 */
  const articlesDate = articles.map((article) => {
    const getArticleDay = new Date(article.createdAt);
    const articleYear = getArticleDay.getFullYear();
    const articleMonth = getArticleDay.getMonth() + 1;
    const articleDate = getArticleDay.getDate();

    return articleYear + "/" + articleMonth + "/" + articleDate;
  });

  /** article の日付のみを抽出し、重複を削除したオブジェクト */
  const duplicationDeletedArticlesDateObject = new Set(articlesDate);
  /** article の日付のみを抽出し、重複を削除したオブジェクトを配列に変換 */
  const duplicationDeletedArticlesDate = Array.from(
    duplicationDeletedArticlesDateObject
  );

  /** 日付が同一の articles を同じ配列にまとめる */
  const articleIndexByDate: { date: string; articleIndexes: number[] }[] = [];

  for (const duplicationDeletedArticleDate of duplicationDeletedArticlesDate) {
    articleIndexByDate.push({
      date: duplicationDeletedArticleDate,
      articleIndexes: articlesDate.flatMap((item: string, i: number) =>
        item === duplicationDeletedArticleDate ? i : []
      ),
    });
  }

  return articleIndexByDate;
};

export const convertChirpDate = (getDate: string) => {
  const date = new Date(getDate);
  const hour: string = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`;
  const minute: string = `${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;

  return `${hour}:${minute}`;
};
