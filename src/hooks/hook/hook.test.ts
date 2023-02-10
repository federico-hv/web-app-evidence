import { describe, expect, it } from 'vitest';
import { useHook } from '.';
import { renderHook } from '@testing-library/react';

describe('Hook: useHook', () => {
  it('should return name with empty string', () => {
    const { result } = renderHook(() => useHook());
    expect(result.current.name).toEqual('');
  });
});
