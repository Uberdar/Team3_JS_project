export default class APIQuery {
    constructor(){
        this.API_KEY = 'c92c75743b7b53c3d8b6c69fd6fd4463';
        this.page = 1;
        this.searchMovieNameVariable = 'snail';
        this.movie_id = '';
    }
    async TrandingMovies(){
        try {
            const projAPI = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${this.API_KEY}`);
            const projAPI_JSONED = await projAPI.json();
            // console.log(projAPI_JSONED);
            return projAPI_JSONED;
        }
        catch (error){
            console.log(error);
        }

    }
    async SearchMovie(){
        try {
            const SM_API = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&page=1&include_adult=false&query=${this.searchMovieNameVariable}`);
            const SM_API_JSONED = await SM_API.json();
            // console.log(SM_API_JSONED);
            return SM_API_JSONED;
        }
        catch (error){
            console.log(error);
        }
    }
    async DetailedMovieInfo(){
        try {

            const INFO_API = await fetch(`https://api.themoviedb.org/3/movie/${this.movie_id}?api_key=${this.API_KEY}&language=en-US`);
            const INFO_API_JSONED = await INFO_API.json();
            // console.log(SM_API_JSONED);
            return INFO_API_JSONED;
        }
        catch (error){
            console.log(error);
        }
    }
    async GetGenres(){
        const genre_api = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`);
        const jsoned_genre_api = await genre_api.json();
        return jsoned_genre_api;
    }
    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchMovieNameVariable;
    }
    set query(newQuery){
        this.searchMovieNameVariable = newQuery;
    }
    get movieId(){
        return this.movie_id;
    }
    set movieId(newId){
        this.movie_id = newId;
    }
    
}
