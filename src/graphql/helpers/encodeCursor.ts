export const encodeCursor = (id: string, createdAt: string) => {
  const cursor = `${id}:${createdAt}`;
  return Buffer.from(cursor).toString("base64");
};
