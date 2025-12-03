
const look_for_user = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      // return check_account_type()
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/login.html";
};

// let user_is_active = look_for_user("is_active");
// if (user_is_active == "false") {
//   window.location.href = "/inactive.html";
// }

((cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return look_for_user("user");
      // return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.confirm("Please you need to login to access this page");
  window.location.href = "/login.html";
})("token");



