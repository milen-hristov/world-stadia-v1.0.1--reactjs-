const getGoogleMapLinkEmbed = (iframe) => {

    let url = '';
    // let pattern = /(?:<iframe src=")(?<url>https:\/\/[\w+\W+\D+\d+]+)(?:" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"><\/iframe>)/i;
    let pattern = /https:\/\/[\w./?=!\-%]+/i;

    let result = pattern.exec(iframe);

    if (result !== null) {
        url = result[0];
    }

    return url;
}

export default getGoogleMapLinkEmbed;