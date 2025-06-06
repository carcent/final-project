export async function loadHeaderFooter (){
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerContent = await loadTemplate("../partials/header.html");
  const footerContent = await loadTemplate("../partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);
}