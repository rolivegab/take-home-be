### Some insights

1) Changed project to use typescript strict, everything is safer and better now. Also, I didn't need to make anything verbose, typescript has it's ways to automatically infer a lot of things.

2) I tried to create a docker-compose.dev.yaml, for local development, but root folder have node_modules and other things inside .dockerignore, so I didn't want to spend much time on configuring project to have [multiple .dockerignore file support](https://stackoverflow.com/questions/45344158/multiple-dockerignore-files-in-same-directory)

3) I tested creation of new modules/controllers/services, and you can see some of them on repository.

4) I implemented a custom decorator at `src/utils/sRes.ts` by adding a error200 method on it, which receives original express Response object and extends it so it returns the same error format to clients.

5) My opinion is that http codes should be related to `HTTP Request`, and the server's response header should not depend on the differences of two valid request bodies.

6) NestJS and Passport is great, but I probably prefer will not use it in my next projects. In the end of day, I think I still prefer to implement my own routes/modules/middlewares and having everything more explicit on the project.

7) Google API geolocation was easy to setup, but I took some time to understand FeatureFlags, and in the end, I find it very useful. In fact, in my actual job at Flutter they have their own tool, called tools-1, in which we can setup FeatureFlags, and also ResolverTags (which are tags that resolves urls, very useful when working with a multidomain project and a lot of services)

8) I also removed everything I'm not using on the project, including Medication modules and all dependencies. Don't know if I could do it, but now it's easier to stay focused in what I did.

9) I normally setup a prettier eslint plugin, it's very useful because it normalizes all styles, spaces, quotes, etc. Something that eslint alone can't do very well.

10) I updated packages dependencies, I like to do it. I also like to have unit tests so I can do a regression test after package updates.

11) Didn't had time to add more unit tests here, for backend I prefer to use mocha over jest, I just find it more stable and with less issues.

12) I also created migrations, and improve swagger experience. Authentication is persisted over reloads, and you can do basic auth on top right button. Also, default parameters refer to real default values on database, so you can test all the api endpoints without much pain.

13) I don't like to use sequelize in a typescript environment. I think we have a lot of better options, like prisma, mikroOrm and even plain sql by using pgTyped (seriously, this is awesome)

14) I also implemented a BasicStrategy and removed local and jwtOnes, for simplification.

I think it's that.
Hope you enjoy!