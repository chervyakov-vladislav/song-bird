// const route = (event) => {
//   event = event || window.event
//   event.preventDefault()
//   window.history.pushState({}, "", event.target.href);
//   handleLocation();
// }

// const routes = {
//   "/": "./welcome.html",
//   "/game": "./game.html",
//   "/gallary": "./gallary.html",
//   "/results": "./results.html",
// };

// const handleLocation = () => {
//   const path = window.location.pathname;
//   const route = routes[path];
//   fetch(route)
//       .then((data) => {console.log(data); data.text()
//                                                 .then((data) => { 
//                                                                   document.getElementById("routes").innerHTML = data;
//                                                                   console.log(data);
//                                                                 }
//                                                   )});
// };

// window.onpopstate = handleLocation;
// window.route = route;

// export {handleLocation}
// export default route