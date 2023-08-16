
import { createMocks, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handle from '../pages/api/users';
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import Home from '../pages/index'

describe("Todo App", () => {
    it("renders the todo app", () => {
      render(<Home />);
    
      expect(screen.getByTestId("all-todo")).toBeInTheDocument();
    //   expect(screen.getByTestId("add-todo")).toBeInTheDocument();
    });
  
});
