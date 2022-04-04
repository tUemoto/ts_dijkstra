import { validatePort } from '../src/validatePort'

test('arg is undefined', () => {
  expect(validatePort(undefined)).toBe(null)
})

test('arg is string type', () => {
  expect(validatePort('hoge')).toBe(null)
})

test('arg > 65535', () => {
  expect(validatePort(65536)).toBe(null)
})

test('arg < 0', () => {
  expect(validatePort(-1)).toBe(null)
})

test('arg is float', () => {
  expect(validatePort(3.14)).toBe(null)
})

test('returns port normaly', () => {
  expect(validatePort(3000)).toBe(3000)
})
