const totalLikes = require('../utils/totalLikes').totalLikes

describe('Total likes', () => {
    test('Tyhjä lista on 0', () => {
        const blogs = []

        const result = totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('Yhden listan tykkäyksien määrä vastaa', () => {
        const blogs = [{_id: '12345',title: 'tykkaystesti1',author: 'tekija1',url: 'https://wwww.testiblogi1.com',likes: 22}]
        const result = totalLikes(blogs)
        expect(result).toBe(22)
    })

    test('Useamman listan tykkäykset vastaavat', () => {
        const blogs = [
            {_id: '54321',title: 'tykkaystesti2',author: 'tekija2',url: 'https://wwww.testiblogi2.com',likes: 43},
            {_id: '11111',title: 'tykkaystesti3',author: 'tekija3',url: 'https://wwww.testiblogi3.com',likes: 64}
        ]
        const result = totalLikes(blogs)
        expect(result).toBe(107)
    })
})