export type TestData = {
  id: string;
  name: string;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: string;
}[];

export type ApiCallProps<T> = {
  api: string;
  key: string;
  setData: React.Dispatch<React.SetStateAction<T>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
