import { useSearchParams } from 'react-router-dom';

/**
 *
 */
export function useUpdateFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = String(searchParams.get('filters') || '').split(',');

  return (isActive: boolean, name: string) => {
    if (isActive) {
      // Remove filter
      setSearchParams((prev) => {
        const next = filters.filter((item) => item !== name).join(',');

        if (next.length) {
          prev.set('filters', next);
        } else {
          // remove filter query param when there are no filters
          prev.delete('filters');
        }

        return prev;
      });
    } else {
      // Add filter
      setSearchParams((prev) => {
        prev.set('filters', [name, ...filters].join(','));
        return prev;
      });
    }
  };
}
