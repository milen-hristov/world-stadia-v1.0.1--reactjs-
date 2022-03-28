import '../NotFound/NotFound.css';

const NotFound = () => {

    return (
        <section className="not-found-wrapper">
            <article className="not-found-error">
                <h2>404</h2>
            </article>
            <article className="not-found">
                <h2>oops! something went wrong</h2>
            </article>
            <article className="not-found">
                <h2>page not found</h2>
            </article>
            <article className="not-found-description">
                <p>The resource you are looking for has been removed, had its name changed, or is temporarily unavailable.</p>
            </article>
        </section>

    );
}

export default NotFound;