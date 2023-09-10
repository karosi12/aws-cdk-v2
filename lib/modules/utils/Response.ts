export const formatResponse = (data: any) => {
  return JSON.stringify(data);
};

export const convertResponse = (data: string | object) => {
  return typeof data === "object" ? data : JSON.parse(data);
};
