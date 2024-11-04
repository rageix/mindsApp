import { QueryClient } from '@tanstack/react-query';

export const fileQueryKeys: string[] = ['/api/files/pagination'];

export function reloadFiles(client: QueryClient) {
  for (const key of fileQueryKeys) {
    client.invalidateQueries({ queryKey: [key] });
  }
}
