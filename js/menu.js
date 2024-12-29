const menuButtons = document.getElementsByClassName("menu--button");
const mobileMenus = document.getElementsByClassName("mobile--menu");

if (menuButtons.length > 0 && mobileMenus.length > 0) {
  let isOpen = false;

  const menuButton = menuButtons[0];
  const mobileMenu = mobileMenus[0];

  menuButton.addEventListener("click", () => {
    if (!isOpen) {
      mobileMenu.style.height = "130px";
      isOpen = true;
    } else {
      mobileMenu.style.height = "0";
      isOpen = false;
    }
  });
}
