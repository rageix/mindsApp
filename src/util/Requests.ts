import { toast } from 'react-toastify';
import HttpStatusCodes from '@/common/HttpStatusCodes';
import tokenService from '@/services/TokenService';
import { IErrorResponse } from '@/types/ErrorResponse';

export async function processResponse<T>(
  response: Response,
): Promise<T | null> {
  let responseJson: T;

  try {
    responseJson = await response.json();
  } catch (e) {
    console.log('Failed to decode json response: ', e);
    toast.error('Failed to decode json response, see console for more info.');
    return null;
  }

  switch (response.status) {
    case HttpStatusCodes.OK:
    case HttpStatusCodes.CREATED:
      return responseJson;
    case HttpStatusCodes.BAD_REQUEST:
      for (const error of (responseJson as IErrorResponse).errors || []) {
        toast.error(error);
      }
      break;
    case HttpStatusCodes.NOT_FOUND:
      toast.error(`Request error. Route not found: ${response.url}`);
      break;
    case HttpStatusCodes.INTERNAL_SERVER_ERROR:
      for (const error of (responseJson as IErrorResponse).errors || []) {
        toast.error(error);
      }
      break;
  }

  return null;
}

export async function getJson<V>(
  url = '',
  data?: Record<string, unknown>,
): Promise<V | null> {
  let query = '';
  if (data) {
    query = '?q=' + JSON.stringify(data);
  }
  return await sendData<V>(url + query, 'GET');
}

export async function postJson<T, V>(url = '', data: T): Promise<V | null> {
  return await sendData<V>(url, 'POST', JSON.stringify(data));
}

export async function postForm<V>(url = '', data: FormData): Promise<V | null> {
  return await sendDataMultipart<V>(url, 'POST', data);
}

export async function putJson<T, V>(url = '', data: T): Promise<V | null> {
  return await sendData<V>(url, 'PUT', JSON.stringify(data));
}

export async function putForm<V>(url = '', data: FormData): Promise<V | null> {
  return await sendData<V>(url, 'PUT', data);
}

export async function deleteJson<T, V>(url = '', data: T): Promise<V | null> {
  return await sendData<V>(url, 'DELETE', JSON.stringify(data));
}

export async function sendDataMultipart<V>(
  url = '',
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: BodyInit,
  // we want to return null on failure because
  // tanstack query complains if return data is undefined
): Promise<V | null> {
  try {
    const rawResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: tokenService.get(),
      },
      redirect: 'follow',
      body: data,
    });
    return await processResponse<V>(rawResponse);
  } catch (e) {
    if (e instanceof TypeError) {
      toast.error(`Request error. Unable to connect to url: ${url}`);
    } else {
      console.log('Request error. Unknown error: ', e);
      toast.error(
        'Request error. Unknown error. See console for more details.',
      );
    }
    return null;
  }
}

export async function sendData<V>(
  url = '',
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: BodyInit,
  // we want to return null on failure because
  // tanstack query complains if return data is undefined
): Promise<V | null> {
  try {
    const rawResponse = await fetch(url, {
      method: method,
      headers: {
        Authorization: tokenService.get(),
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: data,
    });
    return await processResponse<V>(rawResponse);
  } catch (e) {
    if (e instanceof TypeError) {
      toast.error(`Request error. Unable to connect to url: ${url}`);
    } else {
      console.log('Request error. Unknown error: ', e);
      toast.error(
        'Request error. Unknown error. See console for more details.',
      );
    }
    return null;
  }
}
