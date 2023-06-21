import { describe, it, expect } from 'vitest'
import { sum } from '../../src/sample'

describe('Helpers', () => {
  it('sum', () => {
    const result = sum(1, 5)
    expect(result).toBe(6)
  })
})
