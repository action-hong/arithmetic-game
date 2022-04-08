import { describe, expect, it } from 'vitest'
import { decodeEqual, encodeEqual } from '~/core'

describe('core/utils', () => {
  it('decode/endcode equals', () => {
    const origin = '1+2-3×4÷5=6'
    const t1 = encodeEqual(origin)
    expect(t1).toMatchInlineSnapshot('"MWoyazNsNG01bjY="')
    const t2 = decodeEqual(t1)
    expect(t2).toBe(origin)
  })
})
