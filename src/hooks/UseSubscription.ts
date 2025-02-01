'use client';
import { useEffect, useState } from 'react';
import subscriptionStore from '@/stores/CurrentSubscription';
import subscriptionService from '@/services/SubscriptionService';
import _ from 'lodash';

export default function useSubscription() {
  const [data, setData] = useState(subscriptionStore.get());

  useEffect(() => {
    return subscriptionStore.subscribe(setData);
  }, []);

  function reload() {
    subscriptionService.reload();
  }

  function isLoaded(): boolean {
    return data.loaded;
  }

  function hasSubscription(): boolean {
    if (!data.loaded) {
      return false;
    }
    return !_.isEmpty(data.data);
  }

  return {
    data: data.data,
    reload,
    // clear,
    // query,
    isLoaded,
    hasSubscription,
  };
}
