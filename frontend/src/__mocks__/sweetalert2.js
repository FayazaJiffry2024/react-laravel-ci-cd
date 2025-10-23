// src/__mocks__/sweetalert2.js
export default {
  fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
};
