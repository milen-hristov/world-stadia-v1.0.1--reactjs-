import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import CommentsMyProfileCard from '../CommentsMyProfileCard/CommentsMyProfileCard.js';

describe('Comment card my profile Component', () => {

    it('Should display time', () => {
        let myStadiumComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsMyProfileCard myStadiumComments={myStadiumComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.my-profile-comment-date').textContent).toBe(new Date("1231312321").toString());

    });


    it('Should display message', () => {
        let myStadiumComments = {
            _createdOn: "1231312321",
            message: "My stadium comment",
        }

        render(
            <BrowserRouter>
                <CommentsMyProfileCard myStadiumComments={myStadiumComments} />
            </BrowserRouter>
        );

        expect(document.querySelector('.my-profile-comment-description p').textContent).toBe("My stadium comment");

    });
});

