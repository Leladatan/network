export const RandomBanner = (banners: string[]): string => {
  return banners[Math.floor(banners.length * Math.random())];
};