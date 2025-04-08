export type Blog = {
  id: number;
  title: string;
  thumbnail: string;
  image: string;
  overview: string;
  components?: Array<any>;
  disabled?: boolean;
};

export type ArticleComponent = {
  name: string;
  description: string;
  code: string;
};

export type Article = {
  id: number;
  title: string;
  description: string;
  components: ArticleComponent[];
};
