import {get} from './api.js';

export const booksIn = await get('/jsonstore/collections/books')