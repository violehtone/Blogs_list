const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('total likes', () => {
  const blogs = [
    {
      'title': 'Test blog1',
      'author': 'Some random dude',
      'url': 'www.blogaddress.com',
      'likes': 10,
      'id': '5eff46cb9414f157857cc465'
    },
    {
      'title': 'Test blog2',
      'author': 'Some random dude',
      'url': 'www.blogaddress.com',
      'likes': 5,
      'id': '5eff480c955bb358b8095340'
    },
    {
      'title': 'Test blog3',
      'author': 'Some random dude',
      'url': 'www.blogaddress.com',
      'likes': 2,
      'id': '5eff4810955bb358b8095341'
    }
  ]

  const result = listHelper.totalLikes(blogs)
  expect(result).toEqual(17)
})