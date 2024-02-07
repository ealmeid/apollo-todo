export const decodeCursor = (cursor: string) => {
  const text = Buffer.from(cursor, "base64").toString("ascii");
  const [id, createdAt] = text.split(":");

  return { id, createdAt } as { id: string; createdAt: string };
};
