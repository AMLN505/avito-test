import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { checkData } from '../utils/checkData';

interface IDoc {
	id: number;
	name: string;
	alternativeName: string;
	countries: { name: string }[];
	ageRating: number;
	year: number;
}

interface IFilmsData {
	docs: IDoc[];
	pages: number;
}

interface IFilmsInfo {
	name: string;
	alternativeName: string;
	description: string;
	isSeries: boolean;
	similarMovies: { name: string; id: number }[];
	countries: { name: string }[];
	ageRating: number;
	year: number;
	rating: {
		kp: number;
		imdb: number;
	};
	persons: { name: string; enName: string; id: number }[];
}

interface IImagesData {
	docs: { url: string; id: string }[];
}

interface IReviewsData {
	docs: { author: string; review: string }[];
	pages: number;
}

interface IEpisode {
	name: string;
	enName: string;
	number: number;
}

interface ISeasonsData {
	docs: {
		name: string;
		enName: string;
		number: number;
		episodes: IEpisode[];
	}[];
	pages: number;
}

const staggeredBaseQuery = retry(
	fetchBaseQuery({ baseUrl: 'https://api.kinopoisk.dev' }),
	{
		maxRetries: 2,
	},
);

export const kinopoiskAPI = createApi({
	reducerPath: 'kinopoisk',
	baseQuery: staggeredBaseQuery,
	endpoints: (build) => ({
		getFilteredFilms: build.query({
			query: (args) => {
				const { page, limit, year, country, ageRating } = args;

				let url = `/v1.4/movie?page=${page}&limit=${limit}`;

				if (year !== null) {
					url = url.concat(`&year=${year}`);
				}
				if (country !== null) {
					url = url.concat(`&countries.name=${country}`);
				}
				if (ageRating !== null) {
					url = url.concat(`&ageRating=${ageRating}`);
				}

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: IFilmsData) => {
				const docs = res.docs
					.filter((a) => a.id)
					.map((a) => {
						return {
							id: a.id,
							name: checkData(a.name ? a.name : a.alternativeName),
							countries: a.countries,
							ageRating: checkData(a.ageRating),
							year: checkData(a.year),
						};
					});

				const pages = res.pages;
				const response = { docs, pages };

				return response;
			},
		}),

		getSearchedFilms: build.query({
			query: (args) => {
				const { page, limit, query } = args;
				const url = `/v1.4/movie/search?page=${page}&limit=${limit}&query=${query}`;

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: IFilmsData) => {
				const docs = res.docs
					.filter((a) => a.id)
					.map((a) => {
						return {
							id: a.id,
							name: checkData(a.name ? a.name : a.alternativeName),
							countries: a.countries,
							ageRating: checkData(a.ageRating),
							year: checkData(a.year),
						};
					});

				const pages = res.pages;
				const response = { docs, pages };

				return response;
			},
		}),

		getCountries: build.query({
			query: () => {
				const url = '/v1/movie/possible-values-by-field?field=countries.name';

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: { name: string }[]) => res.map((a) => a.name),
		}),

		getFilmInfo: build.query({
			query: (id: string | undefined) => {
				const url = `/v1.4/movie/${id}`;

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: IFilmsInfo) => {
				const similarMovies = res.similarMovies
					.filter((a) => a.id)
					.map((x) => {
						return {
							name: checkData(x.name),
							id: x.id,
						};
					});

				const countries = res.countries.map((x) => x.name);

				const rating = {
					kp: checkData(res.rating.kp),
					imdb: checkData(res.rating.imdb),
				};

				const persons = res.persons.map((x) => {
					return { name: checkData(x.name ? x.name : x.enName), id: x.id };
				});

				return {
					name: checkData(res.name ? res.name : res.alternativeName),
					description: res.description,
					isSeries: res.isSeries,
					similarMovies: similarMovies,
					countries: countries,
					ageRating: checkData(res.ageRating),
					year: checkData(res.year),
					rating: rating,
					persons: persons,
				};
			},
		}),

		getImages: build.query({
			query: (id: string) => {
				const url = `/v1.4/image?page=1&limit=30&selectFields=&movieId=${id}&type=!shooting`;

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: IImagesData) =>
				res.docs.map((a) => {
					return { url: a.url, id: a.id };
				}),
		}),

		getReviews: build.query({
			query: (args) => {
				const { page, id } = args;
				const url = `/v1.4/review?page=${page}&limit=3&movieId=${id}`;

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: IReviewsData) => {
				const reviews = res.docs.map((a) => {
					return { author: checkData(a.author), review: checkData(a.review) };
				});

				const pages = checkData(res.pages);

				return {
					reviews: reviews,
					pages: pages,
				};
			},
		}),

		getSerialInfo: build.query({
			query: (args) => {
				const { page, id } = args;
				const url = `/v1.4/season?page=${page}&limit=10&movieId=${id}`;

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: ISeasonsData) => {
				const seasons = res.docs.map((a) => {
					return {
						name: checkData(a.name ? a.name : a.enName),
						number: checkData(a.number),
						episodes: a.episodes.map((x) => {
							return {
								name: checkData(x.name ? x.name : x.enName),
								number: checkData(x.number),
							};
						}),
					};
				});

				const pages = checkData(res.pages);

				return {
					seasons: seasons,
					pages: pages,
				};
			},
		}),

		getGenres: build.query({
			query: () => {
				const url = '/v1/movie/possible-values-by-field?field=genres.name';

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: { name: string }[]) => res.map((a) => a.name),
		}),

		getRandomFilm: build.query({
			query: (args) => {
				const { isSeries, year, kpRating, genre, country, studio } = args;

				let url = `/v1.4/movie/random?isSeries=${isSeries}`;

				if (year !== null) {
					url = url.concat(`&year=${year}`);
				}
				if (kpRating !== null) {
					url = url.concat(`&rating.kp=${kpRating}`);
				}
				if (genre !== null) {
					url = url.concat(`&genres.name=${genre}`);
				}
				if (country !== null) {
					url = url.concat(`&countries.name=${country}`);
				}
				if (studio !== null) {
					url = url.concat(`&networks.items.name=${studio}`);
				}

				return {
					url: url,
					headers: {
						'X-API-KEY': process.env.REACT_APP_TOKEN,
					},
				};
			},
			transformResponse: (res: { id: number }) =>
				res !== null ? res.id : null,
		}),
	}),
});
