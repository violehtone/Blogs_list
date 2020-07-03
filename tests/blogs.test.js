const listHelper = require('../utils/list_helper')
const { TestScheduler } = require('jest')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})