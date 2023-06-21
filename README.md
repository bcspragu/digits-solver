# Digits Solver

## An accessible version of the New York Times game Digits

_(Or the numbers round from Countdown, if you prefer)_

![Numbers Game](https://github.com/joshfarrant/digits-solver/assets/6840861/6441c0ee-dc89-4ecf-ab9a-ef7ad5996afc)

## Running the app

This is a pretty straight-forward SvelteKit app, check the scripts in the `package.json` for how to run it.

## Notes

First and foremost, this is an MVP. The components are bloated, there could be significantly better code re-use, there's no testing, and I know there are still some bugs hanging around.

It's also worth noting that this is my first foray into Svelte, so I'm sure I'll be doing many things in a sub-optimal way. I'm also not a mathematician, and I know there are more efficient ways of finding solutions than the brute-force method I currently employ. Maybe bring in some memoization, although the storage and lookup of the calculatino result may well take longer than the calculation itself. Before anything else I'd probably make the app aware of the fact that the + and × operations are commutative, which would in theory reduce the number of operations required to find all solutions by 25% (2 of the 4 operations are commutative, and we'd have to do half as many calculations for each of those 2 operations).

For the most part though, this works. I wanted to build a tool to tell me the minimum number of operations required to reach a target number. I wrote the solver in node initially and built a simple CLI around it, but found it frustrating that I couldn't check it while on my phone. After building the solver I realised that I could easily build an implementation of the game around it too, and that it wouldn't be much work to make it somewhat accessible.

Anyway, I don't know why I'm writing a blog post in this README, but here we are and I'm still typing.

Oh check out how the solver is used in the app too, that was an interesting journey. When I first brought the solver code in, the app started doing all sorts of strange stuff. It took me a while to realise that the call to the heavy solver function (which took around 5 seconds at the time on my machine) was blocking the main thread and making the whole UI unresponsive. No bueno. So I whacked that bad boy into a Web Worker and whaddaya know it worked a treat. I could, of course, pre-calculate all of the solutions to the NYT puzzles up-front and store the results alongside the puzzle in the JSON, but where's the fun in that?!

If you wanted to take this even further you could fork the repo, add a backend to store the puzzles and solutions in a database, and then build a leaderboard and a view to show the most common solutions and all sorts of fun stuff. I'm probably not going to do that though.
