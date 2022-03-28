import { BrowserRouter } from 'react-router-dom';
import { render} from '@testing-library/react';

import StadiumCardHomeCapacity from '../../StadiumCards/StadiumCardHomeCapacity/StadiumCardHomeCapacity.js';

describe('Stadium home capacity card Component', () => {
    it('Should display name + capacity', () => {
        let stadiums = {
            name: "EL MONUMENTAL",
            _id: "123456",
            imageUrl: "http://link.image.elmonumental",
            capacity: "99999"
        }

        render(
            <BrowserRouter>
                <StadiumCardHomeCapacity stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('.stadium-name').textContent).toBe('EL MONUMENTAL (99999)');

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
                <StadiumCardHomeCapacity stadiums={stadiums} />
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
                <StadiumCardHomeCapacity stadiums={stadiums} />
            </BrowserRouter>
        );

        expect(document.querySelector('a').href).toBe(`http://localhost/stadiums/details/123456`);

    });
});

