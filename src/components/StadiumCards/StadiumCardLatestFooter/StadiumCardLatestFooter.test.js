import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render} from '@testing-library/react';

import StadiumCardLatestFooter from '../StadiumCardLatestFooter/StadiumCardLatestFooter.js';

describe('Stadium latest stadium footer card Component', () => {
    it('Should display name', () => {
        let stadiums = {
            name: "EL MONUMENTAL",
            _id: "123456",
            imageUrl: "http://link.image.elmonumental",
            capacity: "99999"
        }

        render(
            <BrowserRouter>
                <StadiumCardLatestFooter stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('.footer-stadium-card-info-container a').textContent).toBe('EL MONUMENTAL');

    });

    it('Should display capacity', () => {
        let stadiums = {
            name: "EL MONUMENTAL",
            _id: "123456",
            imageUrl: "http://link.image.elmonumental",
            capacity: "99999"
        }

        render(
            <BrowserRouter>
                <StadiumCardLatestFooter stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('.footer-stadium-card-info-container span').textContent).toBe('Capacity: 99999');

    });


    it('Should display image', () => {
        let stadiums = {
            name: "EL MONUMENTAL",
            _id: "123456",
            imageUrl: "http://link.image.elmonumental",
            capacity: "99999"
        }

        render(
            <BrowserRouter>
                <StadiumCardLatestFooter stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('img').src).toBe("http://link.image.elmonumental/");

    });

    it('Should display proper link', () => {
        let stadiums = {
            name: "EL MONUMENTAL",
            _id: "123456",
            imageUrl: "http://link.image.elmonumental/",
            capacity: "99999"
        }

        render(
            <BrowserRouter>
                <StadiumCardLatestFooter stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('a').href).toBe(`http://localhost/stadiums/details/123456`);

    });
});

