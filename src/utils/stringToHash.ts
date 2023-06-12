interface HashState {
  method: string | undefined;
  url: string | undefined;
  data: string;
  secret: string;
}

export const stringToHash = ({ method, url, data, secret }: HashState) => {
  if (data) {
    return `${method?.toUpperCase()}${url}${JSON.stringify(data)}${secret}`;
  }

  return `${method?.toUpperCase()}${url}${secret}`;
};
