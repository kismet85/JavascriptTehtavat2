let token, userData;

window.onload = async function () {
  try {
    token = sessionStorage.getItem("token");
    userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log(userData);
    if (token) {
      const usernameSpan = document.getElementById("username");
      const userEmail = document.getElementById("email");
      const userPassword = document.getElementById("password");
      if (userData && userData.username) {
        usernameSpan.value = userData.username;
        userEmail.value = userData.email;
        userPassword.value = "*****";
      }

      avatarInit();
    } else {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Error initializing profile:", error);
  }
};

let avatar;
function avatarInit() {
  avatar = document.getElementById("avatar");
  if (!data.data.avatar) {
    avatar.src = "/default-avatar.jpg";
  } else {
    getAvatar(data, token)
      .then((url) => {
        avatar.src = url;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const fileInput = document.getElementById("avatar-input");

const changeAvatarButton = document.getElementById("change-avatar-button");
changeAvatarButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", function () {
  uploadProfilePicture(fileInput.files[0], token);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});

async function uploadProfilePicture(file, token) {
  const formData = new FormData();
  formData.append("avatar", file);
  try {
    const response = await fetch(
      "https://10.120.32.94/restaurant/api/v1/users/avatar",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    let data = await response.json();
    sessionStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    console.log("Error: ", error);
  }
}

document.getElementById("edit-info").addEventListener("click", async () => {
  try {
    const newUsername = document.getElementById("username").value;
    const newEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;
    const token = sessionStorage.getItem("token");
    const infobox = document.getElementById("profile-info");

    const updateSuccess = await updateUserInfo(
      newUsername,
      newEmail,
      token
    );

    if (updateSuccess) {
      infobox.innerHTML = "User information changed succesfully";
      infobox.style.color = "green"; 
    } else {
      infobox("Failed to update user information. Please try again.");
      infobox.innerHTML = "Failed to update user information. Please try again.";
      infobox.style.color = "red"; 
    }
  } catch (error) {
    console.error("Error updating user information:", error);
  }
});

async function updateUserInfo(newUsername, newEmail, token) {
  try {
    const response = await fetch(
      "https://10.120.32.94/restaurant/api/v1/users",
      {
        mode:  'cors',
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
        }),
      }
    );

    let data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("data", JSON.stringify(data));
      return true;
    } else {
      console.log(data);
      return false;
    }
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
}
