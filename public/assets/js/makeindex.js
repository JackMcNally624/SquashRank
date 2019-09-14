

let productNames = [];
let description = [];
let external = [];
let thirdparty = [];

async function getData() {
  let response1 = await fetch('/test1');
  productNames = await response1.json();
  let response2 = await fetch('/test2');
  description = await response2.json();
  let response3 = await fetch('/test3');
  external = await response3.json();
  let response4 = await fetch('/test4');
  thirdparty = await response4.json();
  console.log(productNames);
  writepage();
}


function writepage() {
  document.write("<script src=\"assets\/js\/header.js\"><\/script>");
  document.write("<script src=\"assets\/js\/navbar.js\"><\/script>");
  document.write("");
  document.write("	<!-- START DYNAMIC  -->");
  document.write("	<div id=\"page-wrapper\" >");
  document.write("				<div id=\"page-inner\">");
  document.write("				<div class=\"container\">");
  document.write("				  <h2>Digital Products<\/h2>");
  document.write("				  <table class=\"table table-hover\">");
  document.write("					<thead>");
  document.write("					  <tr>");
  document.write("						<th>Name<\/th>");
  document.write("						<th>Description<\/th>");
  document.write("						<th>External<\/th>");
  document.write("						<th>Third Party<\/th>");
  document.write("					  <\/tr>");
  document.write("					<\/thead>");
  document.write("					<tbody>");



  var i;
  for (i = 0; i < productNames.length; i++) {
    document.write("<tr>");
    document.write("<td>" + productNames[i] + "<\/td>");
    document.write("<td>" + description[i] + "<\/td>");
    document.write("<td>" + external[i] + "<\/td>");
    document.write("<td>" + thirdparty[i] + "<\/td>");
    document.write("<\/tr>");
  }





  document.write("					<\/tbody>");
  document.write("				  <\/table>");
  document.write("				<\/div>");
  document.write("				<\/div>");
  document.write("	<\/div>");
  document.write("	<!-- END DYNAMIC  -->");
  document.write("");
  document.write("<script src=\"assets\/js\/ender.js\"><\/script>");
  document.write("");
}

getData();
