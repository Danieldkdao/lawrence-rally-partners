type CacheTag = "players" | "sessions";

export const getGlobalTag = (tag: CacheTag) => {
  return `global:${tag}` as const;
};

export const getIdTag = (id: string, tag: CacheTag) => {
  return `${tag}:${id}` as const;
};

export const getUserResourceTag = (userId: string, tag: CacheTag) => {
  return `user:${userId}:${tag}` as const;
};
