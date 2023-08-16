
import { createMocks, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handle from '../pages/api/tasks';

describe('api/tasks', () => {
    test('returns all tasks', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '1',
        },
      });
  
      await handle(req, res);
  
      expect(res._getStatusCode()).toBe(200);
    });
});

describe('api/tasks/1', () => {
    test('get a single task', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
  
      await handle(req, res);
  
      expect(res._getStatusCode()).toBe(200);
    });
});

