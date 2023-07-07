import { describe, it, expect } from 'vitest';
import { templateUtility } from './index';

/**
 * Describe tests here:
 * 1. This test checks if what is returned is true.
 */

describe('Utility: templateUtility', () => {
  it('should be tested and described', () => {
    const result = templateUtility();
    expect(result).toBe(true);
  });
});
