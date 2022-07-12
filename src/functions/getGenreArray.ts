export const getGenreArray = (movies: string[][]) => {
  const flat = movies.flat();
  return [...new Set(flat)];
}