/**********  API Utility Functions **********/
export const checkApiMethod = ({ method }, string) => method === string;
export const notFound404 = (res) =>
  res.status(404).setHeader("Content-type", "text/plain").send("404 Not Found");
export const handleErrors = (res) =>
  res
    .status(500)
    .setHeader("Content-type", "text/plain")
    .send("Internal Server Error");
/**********  END API Utility Functions **********/

/********** Update Base Url For API request **********/
// export const server =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:3000"
//     : "https://next-transition-tracker-511169a3j-blue-ocean.vercel.app/";
/********** END Update Base Url For API request **********/

/********** Checks if the current user is logged in. If not returns null, otherwise returns 'student', or 'admin'**********/

export const checkLogin = async () => {
  const local = localStorage.getItem("currentUser");
  const session = sessionStorage.getItem("currentUser");
  if (!local && !session) {
    return null;
  }
  const checkUser = JSON.parse(session);

  const user = await (await fetch(`/api/users/${checkUser.user_id}`)).json();

  local && localStorage.setItem("currentUser", JSON.stringify(user));
  sessionStorage.setItem("currentUser", JSON.stringify(user));
  if (user) {
    return !user.admin ? "student" : "admin";
  } else {
    return null;
  }
};

/****** Get days to ets ******/
export const getDaysToEts = (ets_date) => {
  const currentDate = new Date();
  const studentETS = new Date(ets_date);

  const DiffTime = studentETS.getTime() - currentDate.getTime();

  return parseInt((DiffTime / (1000 * 3600 * 24)).toFixed(0));
};
