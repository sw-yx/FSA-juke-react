# Notes from Swyx

this project (specifically the part3-starting branch) is deployed at <https://swyx-juke.herokuapp.com/#/>. It cleared up a lot of vague understanding for me particularly around React Router which I have seen before in MeteorJS but never quite understood. Deployment instructions are located [here](https://sw-yx.github.io/2017/FSA-deploy-juke/).

# Juke 1 - a simple React-powered music player

ReactJS is a powerful frontend library that allows you to calculate your UI in a functional style. Think back to when we were calculating our UI in TripPlanner using jQuery - it quickly became difficult to manage the state of the application (even though it was quite small). By separating container components from presentational components and reducing the number of ways to trigger a mutation to one (setState), reasoning about our view becomes as simple as reading a series of functions.

That being said, our code right now isn't perfect - our main component is getting fairly large, and as we introduce more and more features, it could get bloated. It's also a pain to have to pass down a prop from our main state container all the way to the bottom of our view tree - in a larger app, this could be quite far. Fortunately, React is a lightweight, un-opinionated library - we'll soon see that there are many solutions within the React ecosystem that can help us with these problems.

# Juke 2 - a simple React-Router-powered music player

react-router allows us to take control of navigation in a single-page application. Here are some of the tools we've added to our utility-belt:

- Setting up the HashRouter as the parent for our app's JSX.
- Modular view swapping with Route components
- The difference between the "component" and "render" props on Routes
- Linking with the Link component
- The advantages of separating out "stateful components" from "stateless components"

At the beginning of this workshop, we had to swap out views using conditional statements. Now our component hierarchy is clearly and declaratively enshrined by our router. On top of that, now that website navigation actually involves the URL, we can use the web browser's forward, back, and refresh buttons without losing our view, and even share links that will actually load the correct UI.

# Juke 3 - a simple React-powered music player with user-added playlists

In today's adventure, we will implement playlists. Users of the application will be able to create a playlist, browse all playlists, view one playlist, and add songs to any playlist. We will learn how to deal with inputs in React and handle form data.

We've gotten a lot of practice in manipulating events and handling form data with React. We've also closed the loop and implemented a full set of CRUD operations, tying together the whole stack. In summary: good job!

However, even though understanding the flow of data in a React application is much easier than jQuery, we're beginning to see how state management is still a difficult problem. For example, it was tricky for NewPlaylist and Playlist to communicate with each other - we needed their shared state to be managed by a mutual parent. It seems like it's a shame that our state management is coupled with our view hierarchy. That is, where we manage our state is dependent on where the components that need that state are located. What if we have some state that many components need, and those components are way off in different parts of our render hierarchy? That's a lot of props to pass!

Well, don't worry too much, because next time we'll see how we can use redux to de-couple state management from our components and turn our app into a lean, mean, functional machine!

