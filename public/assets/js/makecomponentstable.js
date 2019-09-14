let data = [];

async function getData() {
  let response = await fetch('/api');
  data = await response.json();
  console.log(data);
  writepage();
}

function writepage() {
  document.write("<script src=\"assets\/js\/header.js\"><\/script>");
  document.write("<script src=\"assets\/js\/navbar.js\"><\/script>");
  document.write("");
  document.write("<!-- START DYNAMIC  -->");
  document.write("<div id=\"page-wrapper\" >");
  document.write("<div id=\"page-inner\">");
  document.write("<div class=\"container\">");
  document.write("  <h2>Components<\/h2>");
  var x;
  for (x of data) {
    document.write("<h3>" + x + "</h3>");
  }
  document.write("<table class=\"table table-hover\">");
  document.write("    <thead>");
  document.write("      <tr>");
  document.write("      <th>Name<\/th>");
  document.write("      <th>Description<\/th>");
  document.write("      <th>Commercialization Model<\/th>");
  document.write("      <th>3rd Party Name<\/th>");
  document.write("      <\/tr>");
  document.write("    <\/thead>");
  document.write("    <tbody>");
  document.write("      <tr>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <\/tr>");
  document.write("      <tr>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <\/tr>");
  document.write("      <tr>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <td>Test<\/td>");
  document.write("      <\/tr>");
  document.write("    <\/tbody>");
  document.write("    <\/table>");
  document.write("");
  document.write("<\/div>");
  document.write("<\/div>");
  document.write("<\/div>");
  document.write("<!-- END DYNAMIC  -->");
  document.write("");
  document.write("");
  document.write("");
  document.write("");
  document.write("<script src=\"assets\/js\/ender.js\"><\/script>");
  document.write("");
  console.log(data);
}

getData();
