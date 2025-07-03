export function parseMovies(text) {
    const movies = [];

    const blocks = text.trim().split(/\n\s*\n/);

    for (const block of blocks) {
        const lines = block.split('\n');

        const titleLine = lines.find(line => line.startsWith('Title:'));
        const yearLine = lines.find(line => line.startsWith('Release Year:'));
        const formatLine = lines.find(line => line.startsWith('Format:'));
        const starsLine = lines.find(line => line.startsWith('Stars:'));

        const title = titleLine?.replace('Title:', '').trim();
        const year = parseInt(yearLine?.replace('Release Year:', '').trim());
        const format = formatLine?.replace('Format:', '').trim();
        const stars = starsLine?.replace('Stars:', '').split(',').map(s => s.trim());

        if (title && year && format && stars.length > 0) {
            movies.push({ title, year, format, stars });
        }
    }

    return movies;
}
