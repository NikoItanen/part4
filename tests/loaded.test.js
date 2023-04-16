const listHelper = require('../utils/list_helper')

test('Dummy palauttaa arvon 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})