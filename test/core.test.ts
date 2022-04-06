import { describe, expect, it } from 'vitest'
import { diff, getTipFromResult } from '~/core/diff'

describe('core', () => {
  it('diff', () => {
    expect(diff(
      '1+1=2',
      '2-1=1',
    )).toMatchSnapshot()

    const result = diff(
      '1+1=234',
      '1+1=147',
    )
    expect(result).toMatchSnapshot()

    expect(getTipFromResult(result)).toMatchSnapshot()
  })
})
