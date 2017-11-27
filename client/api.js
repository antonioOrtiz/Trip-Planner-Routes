const fetchAttractions = () =>
  fetch("/api")
    .then(result => result.json())
    .catch(err => console.error(err));


const fetchItinerary = (id) =>{
  let userId  = id.slice(1)
  return fetch(`/api/itinerary/${userId}`)
    .then(result => result.json())
    .catch(err => console.error(err));
}

const saveItinerary = (state) => {
  const userObject = {
    attractions: state.selectedAttractions
  };

  // let userId  = location.hash ? location.hash.slice(1) : null

  // // if(userId){
  // //   userObject.userId = userId;
  // // }
  fetch('/api/itinerary/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(userObject)
  });

}

module.exports = {
  fetchAttractions,
  fetchItinerary,
  saveItinerary
};
