

let quotes = [];
let uniqueAuthors = [];

const getQuotes = async () => {
    try {
        // Fetch the local JSON file
        const response = await fetch('myquotes.json');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }

        // Parse the JSON data
        quotes = await response.json();

        // Extract unique author names for suggestions
        uniqueAuthors = [...new Set(quotes.map(quote => quote.a))];
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const updateAuthorSuggestions = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const matchingAuthors = uniqueAuthors.filter(author => author.toLowerCase().includes(searchInput));

    // Populate the datalist with matching author name suggestions
    const authorsList = document.getElementById('authorsList');
    authorsList.innerHTML = '';

    matchingAuthors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        authorsList.appendChild(option);
    });
};

const displayRandomQuote = () => {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Display the random quote and author
    document.getElementById('quote-text').textContent = quotes[randomIndex].q;
    document.getElementById('quote-author').textContent = '-' + quotes[randomIndex].a;
};

const searchByAuthor = () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const matchingQuotes = quotes.filter(quote => quote.a.toLowerCase().includes(searchInput));

    if (matchingQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
        document.getElementById('quote-text').textContent = matchingQuotes[randomIndex].q;
        document.getElementById('quote-author').textContent = '-' + matchingQuotes[randomIndex].a;
    } else {
        alert('No quotes found for the given author.');
    }
};

// Initial call to fetch quotes
getQuotes().then(() => {
    displayRandomQuote();
    setInterval(displayRandomQuote, 10000);
});


document.getElementById('search-input').addEventListener('input', updateAuthorSuggestions);
