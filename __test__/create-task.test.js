
import { createMocks, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handle from '../pages/api/tasks';
import "@testing-library/jest-dom";

describe('api/tasks', () => {
    test('create a new task', async () => {
      const data = {
        title: 'title',
        description: 'description',
        assignee: 1,
      }
      const { req, res } = createMocks({
        method: 'POST',
        body: data,
      });
  
      await handle(req, res);
  
      expect(res._getStatusCode()).toBe(200);
    });
});
