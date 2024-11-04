import { QueryClient } from '@tanstack/react-query';

export const projectQueryKeys: string[] = [
  '/api/projects/sidebar',
  '/api/projects/pagination',
];

export function reloadProjects(client: QueryClient) {
  for (const key of projectQueryKeys) {
    client.invalidateQueries({ queryKey: [key] });
  }
}
