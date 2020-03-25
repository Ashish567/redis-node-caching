First we created a redis client and link it with the local redis instance using the default redis port (6379)
const client = redis.createClient(6379);
Then, in the /recipe route handler, we tried to get the appropriate matching data to serve the request by checking for the key in our redis store. If found, the result is served to the requesting client from our cache and then we don’t have to make the server request anymore.

// Check the redis store for the data first
   client.get(foodItem, async (err, recipe) => {
     if (recipe) {
       return res.status(200).send({
         error: false,
         message: `Recipe for ${foodItem} from the cache`,
         data: JSON.parse(recipe)
       })
     }
     But if the key is not found in our redis store, a request is made to the server and and once the response is available, we store the result using a unique key in the redis store:

const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);

         // save the record in the cache for subsequent request
         client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));

Hence, subsequent requests to the same endpoint with the same parameter will always be fetched from the cache so long the cached data has not expired. The setex method of the redis client is used to set the key to hold a string value in the store for a particular number of seconds which in this case is 1440 (1 hour).

eg..localhost:3000/recipe/coffee
reference => codementor Michael Owolabi(Software Engineer) 