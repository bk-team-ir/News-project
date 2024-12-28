const menuButtons = document.getElementsByClassName("menu--button");
const mobileMenus = document.getElementsByClassName("mobile--menu");

if (menuButtons.length > 0 && mobileMenus.length > 0) {
  let isOpen = false;

  const menuButton = menuButtons[0];
  const mobileMenu = mobileMenus[0]; // دسترسی به اولین عنصر از mobileMenus

  menuButton.addEventListener("click", () => {
    if (!isOpen) {
      mobileMenu.style.height = "130px"; // باز کردن منو
      isOpen = true;
    } else {
      mobileMenu.style.height = "0"; // بستن منو
      isOpen = false;
    }
  });
}
