export const useQueryParams = () => {
  return new URLSearchParams(window.location.search);
};
