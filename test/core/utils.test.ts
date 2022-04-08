import { describe, expect, it } from 'vitest'
import { decodeEqual, encodeEqual } from '~/core'

describe('core/utils', () => {
  it('decode/endcode equals', () => {
    const origin = '1+2-3×4÷5=6'
    const t1 = encodeEqual(origin)
    expect(t1).toMatchInlineSnapshot('"MWoyazNsNG01bjY="')
    const t2 = decodeEqual(t1)
    expect(t2).toBe(origin)

    const o2 = '1+1+3-1-1×2×2÷1÷1=1'
    expect(decodeEqual(encodeEqual(o2))).toBe(o2)
  })
})
