const sortStadiums = (obj) => {

    let sortedStadiums = Object
    .values(obj)
    .sort((a, b) => a.name.localeCompare(b.name));

    return sortedStadiums;
}

export default sortStadiums;