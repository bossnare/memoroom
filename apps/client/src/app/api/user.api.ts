import { fetcher } from '../lib/fetcher';

export const getUser = async () => {
  const res = await fetcher('/profiles/me');
  return res.data; // return {.., data}
};

export const getUserProfile = async (username?: string) => {
  const res = await fetcher(`/profiles/${username}`);
  return res.data; // return {.., data}
};
