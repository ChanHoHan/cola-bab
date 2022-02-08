export function curLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position.coords.latitude, position.coords.longitude);
    console.log(position);
    return position;
  });
}
