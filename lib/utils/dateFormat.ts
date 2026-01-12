export function formatDate(isoDate: string): string {
    const date = new Date(isoDate); // Parse the ISO string into a Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month with leading zero
    const year = date.getFullYear(); // Get year

    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
}

export function formatDateWithDifference(isoDate: string): string {
    const date = new Date(isoDate); // Parse the ISO string into a Date object
    const now = new Date(); // Get current date and time

    // Calculate the difference in milliseconds
    const diffInMs = now.getTime() - date.getTime();

    // Convert to days, hours, and minutes
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    let differenceString = '';
    if (diffInDays > 0) {
        differenceString += `${diffInDays} day${diffInDays > 1 ? 's' : ''} `;
    }
    if (diffInHours > 0) {
        differenceString += `${diffInHours} hour${diffInHours > 1 ? 's' : ''} `;
    }
    if (diffInMinutes > 0 || (diffInDays === 0 && diffInHours === 0)) {
        differenceString += `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }

    return `${differenceString.trim()} ago`;
}


// Example usage:
const formatted = formatDateWithDifference("2024-11-13T12:00:00Z");
//console.log(formatted); // Output: "13-11-2024 (2 days 5 hours ago)" if today is 15-11-2024

// Example usage:
const formattedDate = formatDate("2024-11-15T00:50:47.133636+00:00");
//console.log(formattedDate); // Output: "15-11-2024"
