function MovieCard({ movie: { Title, Year, Poster } }) {
  const fallbackPoster =
    "https://m.media-amazon.com/images/M/MV5BZmUxZmRiOWEtYWNmZC00YzBjLWE1YjktYjI3ZTZlZDIzNGI5XkEyXkFqcGc@._V1_SX300.jpg";

  const posterUrl =
    Poster === null || Poster === "N/A" ? fallbackPoster : Poster;

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = fallbackPoster;
  }

  return (
    <div className="hover:scale-105 transition-transform">
      <img
        className="aspect-[2/3] w-40 rounded-2xl shadow-md"
        src={posterUrl}
        alt={Title}
        onError={handleImgError}
      />
      <h3 className="mt-2 text-center font-semibold">{Title}</h3>
      <p className="text-center text-sm text-gray-600">{Year}</p>
    </div>
  );
}

export default MovieCard;
