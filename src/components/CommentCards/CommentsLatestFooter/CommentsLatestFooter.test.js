import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import CommentsLatestFooter from '../CommentsLatestFooter/CommentsLatestFooter.js';

describe('Comment card latest footer Component', () => {

    it('Should display time', () => {
        let latestComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsLatestFooter latestComments={latestComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.footer-comment-card-time time').textContent).toBe("DATE: " + new Date("1231312321").toString().slice(0, 21));

    });


    it('Should display message', () => {
        let latestComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsLatestFooter latestComments={latestComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.footer-comment-card h4').textContent).toBe(" COMMENT: My stadium comment... ");

    });
});

