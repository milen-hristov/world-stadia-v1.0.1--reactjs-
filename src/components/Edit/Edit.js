import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useUpdateContext } from '../../contexts/UpdateContextFooter.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import axios from 'axios';

import * as stadiumService from '../../services/stadiumService.js';
import countryList from '../../helpers/countryList.js'
import getGoogleMapLinkEmbed from '../../helpers/getGoogleMapEmbedLink.js';
import errorsCheck from '../../helpers/errorsCheck.js';
import { BASEURLIMAGEOPTIONS } from '../../config/baseUrlImageServer.js';
import '../Edit/Edit.css';

const Edit = ({
    match
}) => {

    const { user } = useAuthContext();
    const { addUpdateStadium } = useUpdateContext();
    const { addNotification } = useNotificationContext();
    const history = useHistory();

    const [stadium, setStadium] = useState({});
    let stadiumId = match.params.stadiumId;
    const [errors, setErrors] = useState({
        name: false,
        country: false,
        city: false,
        capacity: false,
        clubs: false,
        address: false,
        imageUrl: false,
        description: false
    });

    let [serverResponse, setServerResponse] = useState('');

    useEffect(() => {
        stadiumService.getOne(stadiumId)
            .then(stadiumResult => {
                setStadium(stadiumResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, [stadiumId]);

    let [stadiumImg, setstadiumImg] = useState('');

    const onFileChange = (files) => {
        const imageFormData = new FormData();
        imageFormData.append("file", files[0]);
        imageFormData.append("upload_preset", BASEURLIMAGEOPTIONS.cloudinaryPreset);

        axios.post(`${BASEURLIMAGEOPTIONS.cloudinary}/image/upload`, imageFormData)
            .then(res => {
                setstadiumImg(res.data.url);
            }).catch(err => {
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const onStadiumEdit = (e) => {

        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name').trim().toLowerCase();
        let country = formData.get('country').trim();
        let city = formData.get('city').trim();
        let capacity = formData.get('capacity').trim();
        let clubs = formData.get('clubs').trim();
        let addressRaw = formData.get('address').trim();
        let address = getGoogleMapLinkEmbed(addressRaw).toLowerCase();

        let imageUrl = stadium.imageUrl;
        if (stadiumImg != "") {
            imageUrl = stadiumImg;
        }

        let description = formData.get('description').trim();

        let newStadium = {
            name,
            country,
            city,
            capacity,
            clubs,
            address,
            imageUrl,
            description,
        }

        if (stadium.country.toLowerCase() == 'please select country') {
            addNotification('Please check if all fields are filled in properly', types.error);
            return setErrors(state => ({ ...state, country: 'Please select country from the list' }));
        } else {
            setErrors(state => ({ ...state, country: false }));
        }

        if (errorsCheck(errors, false)) {
            addNotification('Please check if all fields are filled in properly', types.error);
            return;
        }

        stadiumService.edit(stadiumId, newStadium, user.accessToken)
            .then(result => {
                console.log('edit success');
                addUpdateStadium(result);
                addNotification('Stadium updated successfully', types.success);
                history.push(`/stadiums/details/${stadiumId}`);
            })
            .catch(err => {
                console.log(err);
                setServerResponse(err.message);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const validateName = (e) => {
        let currentName = e.target.value;

        if (!currentName.match(/^[A-Za-z0-9 ]{3,30}$/)) {
            setErrors(state => ({ ...state, name: 'Stadium name should be between 3 and 30 characters (English letters, Numbers and Spaces allowed)' }));
        } else {
            setErrors(state => ({ ...state, name: false }));
        }
    };

    const validateCity = (e) => {
        let currentName = e.target.value;

        if (!currentName.match(/^[A-Za-z ]{3,15}$/)) {
            setErrors(state => ({ ...state, city: 'City should be between 3 and 15 characters (English letters and Spaces allowed)' }));
        } else {
            setErrors(state => ({ ...state, city: false }));
        }
    };

    const validateCapacity = (e) => {
        let currentName = e.target.value;

        if (currentName < 0) {
            setErrors(state => ({ ...state, capacity: 'Stadium capacity cannot be a negative number' }));
        } else {
            setErrors(state => ({ ...state, capacity: false }));
        }
    };

    const validateClubs = (e) => {
        let currentName = e.target.value;

        if (!currentName.match(/^[A-Za-z0-9- ]{3,100}$/)) {
            setErrors(state => ({ ...state, clubs: 'Clubs should be between 3 and 100 characters (English letters, Numbers, Hyphens (-) and Spaces allowed)' }));
        } else {
            setErrors(state => ({ ...state, clubs: false }));
        }
    };

    const validateAddress = (e, address) => {
        let currentName = e.target.value;
        let result = getGoogleMapLinkEmbed(currentName);

        if (result !== '') {
            address = result;
            setErrors(state => ({ ...state, address: false }));
        } else {
            setErrors(state => ({ ...state, address: 'Please add Google Map Embed url link' }));
        }
    };

    // const validateImageUrl = (e) => {
    //     let currentName = e.target.value;

    //     if (!currentName.match(/^https?:\/{2}/)) {
    //         setErrors(state => ({ ...state, imageUrl: 'Please add Image url' }));
    //     } else {
    //         setErrors(state => ({ ...state, imageUrl: false }));
    //     }
    // };

    const validateDescription = (e) => {
        let currentName = e.target.value;

        if (currentName.length > 1500) {
            setErrors(state => ({ ...state, description: 'Stadium description should be max 1500 characters' }));
        } else {
            setErrors(state => ({ ...state, description: false }));
        }
    };

    return (
        <section className="stadium-form-wrapper">
            <article className="stadium-form-header">
                <h3>Edit</h3>
            </article>
            <form className="stadium-form-content" onSubmit={onStadiumEdit} method="POST">
                <article className="form-group">
                    <input type="text" name="name" id="name" className="stadium-form-input" placeholder="Stadium name *" defaultValue={stadium.name} onChange={validateName} required />
                    {errors.name
                        ? <p className="error">{errors.name}</p>
                        : null
                    }
                </article>

                <article className="form-group-image">
                    <label className="upload-image-field btn-save" htmlFor="upload-image">Upload stadium image</label>
                    <input className="upload-image-input" type="file" id='upload-image' onChange={(e) => onFileChange(e.target.files)} accept="image/png, image/gif, image/jpeg" />
                </article>

                <article className="form-group">
                    <select id="type" name="country" className="stadium-form-input" value={stadium.country} onChange={(e) => setStadium(s => ({ ...s, country: e.target.value }))} >
                        {countryList.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                    {errors.country
                        ? <p className="error">{errors.country}</p>
                        : null
                    }
                </article>
                <article className="form-group">
                    <input type="text" name="city" id="city" className="stadium-form-input" defaultValue={stadium.city} placeholder="City *" onChange={validateCity} required />
                    {errors.city
                        ? <p className="error">{errors.city}</p>
                        : null
                    }
                </article>
                <article className="form-group">
                    <input type="number" name="capacity" id="capacity" className="stadium-form-input" defaultValue={stadium.capacity} placeholder="Stadium capacity *" onChange={validateCapacity} required />
                    {errors.capacity
                        ? <p className="error">{errors.capacity}</p>
                        : null
                    }
                </article>

                <article className="form-group">
                    <input type="text" name="clubs" id="clubs" className="stadium-form-input" defaultValue={stadium.clubs} placeholder="Clubs *" onChange={validateClubs} required />
                    {errors.clubs
                        ? <p className="error">{errors.clubs}</p>
                        : null
                    }
                </article>

                <article className="form-group">
                    <input type="text" name="address" id="address" className="stadium-form-input" defaultValue={stadium.address} placeholder="Google Map Address (embed) *" onChange={validateAddress} required />
                    {errors.address
                        ? <p className="error">{errors.address}</p>
                        : null
                    }
                </article>

                <article className="form-group">
                    <article className="form-group">
                        <textarea name="description" placeholder="Description*" className="stadium-form-input" defaultValue={stadium.description} onChange={validateDescription} rows={7} required />
                    </article>
                    {errors.description
                        ? <p className="error">{errors.description}</p>
                        : null
                    }
                </article>

                <article className="form-group">
                    <button className="btn-submit" type="submit">Edit</button>
                </article>
                {serverResponse !== ''
                    ? <article className="error">Operation cannot be executed - {serverResponse}. Not authorized to edit stadium.</article>
                    : null
                }
            </form>
        </section>
    );
}

export default Edit;
