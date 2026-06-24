import { useEffect, useState } from 'react';
import { fetchCmsCollection } from './cmsClient';

export function useCmsCollection<T>(collectionKey: string, fallback: T[]): T[] {
  return useCmsCollectionState(collectionKey, fallback).items;
}

export function useCmsCollectionState<T>(collectionKey: string, fallback: T[]) {
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void fetchCmsCollection<T>(collectionKey)
      .then((records) => {
        if (active) {
          setItems(records);
          setError('');
        }
      })
      .catch(() => {
        if (active) {
          setItems(fallback);
          setError('Live careers content is temporarily unavailable.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [collectionKey, fallback]);

  return { items, loading, error };
}
