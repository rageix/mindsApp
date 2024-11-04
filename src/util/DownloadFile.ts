import { MongoId } from '@/types/MongoDocument';
import { getApiFiles } from '@/requests/api/files';
import { toast } from 'react-toastify';

export default async function downloadFile(fileId: MongoId) {
  const response = await getApiFiles(fileId);

  if (!response) {
    toast.error('Failed to get download link.');
    return;
  }

  window.open(response.url, '_self');
}
