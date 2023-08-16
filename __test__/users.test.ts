
import { createMocks, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handle from '../pages/api/users';

describe('api/users', () => {
    test('get all users', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
  
      await handle(req, res);
  
      expect(res._getStatusCode()).toBe(200);
    });
});

