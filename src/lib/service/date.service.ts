// Function to format the date
export function formatCreatedAt(dateString:string) {
    const options: Intl.DateTimeFormatOptions  = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }