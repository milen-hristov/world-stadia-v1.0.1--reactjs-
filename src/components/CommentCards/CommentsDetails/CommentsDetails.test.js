import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import CommentsDetails from '../CommentsDetails/CommentsDetails.js';

describe('Comment card details Component', () => {

    it('Should display time', () => {
        let stadiumComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsDetails stadiumComments={stadiumComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.comment-container span time').textContent).toBe(new Date("1231312321").toString());

    });


    it('Should display message', () => {
        let stadiumComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsDetails stadiumComments={stadiumComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.comment-description p').textContent).toBe("My stadium comment");

    });
});

